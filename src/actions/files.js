import axios from 'axios';
import { apiKey, formId } from '../config/config';
import { GET_FILES_SUCCESS, GET_FILES_FAIL } from './types';
import { setFilesLoaded } from './app';
const pretty = require('prettysize');

const normalizeResponse = (submission, submissionDetails, key) => {
    const question = submission[key];
    const { name: questionName, answer: questionAnswer } = question;

    switch (questionName) {
        case 'nameSurname':
            submissionDetails.data = {
                ...submissionDetails.data,
                [questionName]: {
                    'answer': `${questionAnswer['first']} ${questionAnswer['last']}`,
                    'qid': key
                }
            }
            break;
        case 'otherDoc':
        case 'videoAudio':
            if (questionAnswer.length) {
                submissionDetails.data = {
                    ...submissionDetails.data,
                    [questionName]: {
                        'answer': questionAnswer,
                        'qid': key
                    }
                }
            }
            break;
        case 'image':
            if (questionAnswer) {
                submissionDetails.data = {
                    ...submissionDetails.data,
                    [questionName]: {
                        'answer': questionAnswer,
                        'qid': key
                    }
                }
            }
            break;
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

                submissionDetails.data = {
                    ...submissionDetails.data,
                    'tags': {
                        'answer': tagsOfSubmission,
                        'qid': key
                    }
                }
            }
            break;
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

                submissionDetails.data = {
                    ...submissionDetails.data,
                    'tags': {
                        'answer': tagsOfSubmission,
                        'qid': key
                    }
                }
            }
            break;
        default:
            if (questionName !== 'mediaLibrary' && questionName !== 'submit') {
                submissionDetails.data = {
                    ...submissionDetails.data,
                    [questionName]: { 'answer': questionAnswer, 'qid': key }
                }
            }
            break;
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

            const answers = {}
            Object.keys(content).map(key => {
                const submission = content[key].answers
                const createdAt = content[key].created_at.split(' ')[0].split('-')
                const date = `${createdAt[2]}/${createdAt[1]}/${createdAt[0]}`

                const submissionDetails = {
                    submissionId: content[key].id,
                    uploadDate: date,
                    data: {}
                };

                Object.keys(submission).map(key => {
                    normalizeResponse(submission, submissionDetails, key);
                })
                answers[content[key].id] = submissionDetails
            })

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

            file.size = pretty(size, false, false, 2);
        })
    )

}
