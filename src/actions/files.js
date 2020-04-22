import axios from 'axios';
import { apiKey, formId } from '../config/config';
import { GET_FILES_SUCCESS, GET_FILES_FAIL } from './types';


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
        case 'videoAudioOther':
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
        case 'tags':
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

                }

                submissionDetails.data = {
                    ...submissionDetails.data,
                    [questionName]: {
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
export const getAllFiles = (dispatch) => {
    return async (dispatch) => {
        try {
            const config = {
                params: {
                    'apiKey': apiKey
                }
            }

            const res = await axios.get(`https://api.jotform.com/form/${formId}/submissions`, config)
            const content = res.data.content

            const answers = Object.keys(content).map(key => {
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
                return submissionDetails;
            })

            dispatch({
                type: GET_FILES_SUCCESS,
                payload: answers
            })
        } catch (error) {
            dispatch({
                type: GET_FILES_FAIL
            })
        }
    }
}
