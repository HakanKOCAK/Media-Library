import axios from 'axios';
import { apiKey, formId } from '../config/config';
import { GET_FILES_SUCCESS, GET_FILES_FAIL } from './types';
import { setFilesLoaded } from './app';
const pretty = require('prettysize');

const normalizeResponse = (question, submissionDetails, key) => {
    const { name: questionName, answer: questionAnswer } = question;

    if (submissionDetails.data && submissionDetails.data.videoAudio && questionName === 'tagsVideoAudio') {
        submissionDetails.data.tags = {
            'answers': [],
            'qid': key
        }
    } else if (submissionDetails.data && questionName === 'tagsImageOther' && (submissionDetails.data.image || submissionDetails.data.otherDoc)) {
        submissionDetails.data.tags = {
            'answers': [],
            'qid': key
        }
    }
    switch (questionName) {
        case 'nameSurname':
            return submissionDetails.data = {
                ...submissionDetails.data,
                [questionName]: {
                    'answer': `${questionAnswer['first']} ${questionAnswer['last']}`,
                    'qid': key
                }
            }
        case 'otherDoc':
        case 'videoAudio':
            if (questionAnswer.length) {
                return submissionDetails.data = {
                    ...submissionDetails.data,
                    [questionName]: {
                        'answer': questionAnswer,
                        'qid': key
                    }
                }
            }
            return submissionDetails.data;
        case 'image':
            if (questionAnswer) {
                return submissionDetails.data = {
                    ...submissionDetails.data,
                    [questionName]: {
                        'answer': questionAnswer,
                        'qid': key
                    }
                }
            }
            return submissionDetails.data;
        case 'tagsImageOther':
            if (questionAnswer) {
                const tagsOfSubmission = []
                try {
                    const tags = JSON.parse(questionAnswer)
                    tags.map(tag => {
                        Object.keys(tag).map(key => {
                            tagsOfSubmission.push(tag[key])
                        })
                    })

                } catch (error) {
                    console.log(error)
                }

                return submissionDetails.data = {
                    ...submissionDetails.data,
                    'tags': {
                        'answer': tagsOfSubmission,
                        'qid': key
                    }
                }
            }
            return submissionDetails.data;
        case 'tagsVideoAudio':
            if (questionAnswer) {
                const tagsOfSubmission = []
                try {
                    const tags = JSON.parse(questionAnswer);
                    tags.map(tag => {
                        const data = {}
                        Object.keys(tag).map(key => {
                            const answer = tag[key];
                            if (key === 'Tag') {
                                data.tag = answer
                            } else {
                                const trimmed = answer.trim();
                                const intervals = trimmed.split('/')
                                const start = intervals[0];
                                const end = intervals[1];
                                const startMinSec = start.split('-');
                                const endMinSec = end.split('-');
                                data.start = `${startMinSec[0]}:${startMinSec[1]}`;
                                data.end = `${endMinSec[0]}:${endMinSec[1]}`;
                            }
                        })
                        tagsOfSubmission.push(data);
                    })

                } catch (error) {
                    console.log(error);
                }

                return submissionDetails.data = {
                    ...submissionDetails.data,
                    'tags': {
                        'answer': tagsOfSubmission,
                        'qid': key
                    }
                }
            }
            return submissionDetails.data;
        default:
            if (questionName !== 'mediaLibrary' && questionName !== 'submit') {
                return submissionDetails.data = {
                    ...submissionDetails.data,
                    [questionName]: { 'answer': questionAnswer, 'qid': key }
                }
            }
            return submissionDetails.data;
    }
}
export const getAllFiles = () => {
    return async (dispatch) => {
        try {
            const config = {
                params: {
                    'apiKey': apiKey
                }
            }

            const res = await axios.get(`https://api.jotform.com/form/${formId}/submissions`, config)
            const content = res.data.content

            const getAnswers = data =>
                data.reduce((answers, item) => {
                    const submission = item.answers
                    const createdAt = item.created_at.split(' ')[0].split('-')
                    const date = `${createdAt[2]}/${createdAt[1]}/${createdAt[0]}`

                    const submissionDetails = Object.entries(submission).reduce((submissionDetails, value) => {
                        const key = value[0]
                        const question = value[1]
                        return {
                            submissionId: item.id,
                            uploadDate: date,
                            data: normalizeResponse(question, { ...submissionDetails }, key)
                        };
                    }, {})
                    answers[item.id] = submissionDetails
                    return answers
                }, {})

            const answers = getAnswers(Object.values(content))
            await getFileSizes(answers)

            dispatch({
                type: GET_FILES_SUCCESS,
                payload: answers
            })
            dispatch(setFilesLoaded(true));
        } catch (error) {
            console.log(error)
            dispatch({
                type: GET_FILES_FAIL
            })
            dispatch(setFilesLoaded(true));
        }
    }
}

const getFileName = (url) => {
    return url.split('/')[url.split('/').length - 1]
}
const getFileSizes = async (files) => {
    return Promise.all(
        Object.keys(files).map(async (key) => {
            const file = files[key].data
            const url =
                file.videoAudio
                    ?
                    file.videoAudio.answer[0]
                    :
                    file.otherDoc
                        ?
                        file.otherDoc.answer[0]
                        :
                        file.image.answer

            const name = getFileName(url);
            file.fileName = name

            const resp = await axios({
                method: 'get',
                url: url,
                responseType: 'blob'
            })

            const size = resp.data.size

            return file.size = pretty(size, false, false, 2);
        })
    )

}
