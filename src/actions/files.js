import axios from 'axios';
import { apiKey, formId } from '../config/config';
import { GET_FILES_SUCCESS, GET_FILES_FAIL } from './types';

export const getAllFiles = () => async dispatch => {
    try {
        const config = {
            params: {
                'apiKey': apiKey
            }
        }

        const res = await axios.get(`https://api.jotform.com/form/${formId}/submissions`, config)
        const content = res.data.content

        console.log(res)
        const answers = Object.keys(content).map(key => {
            const submission = content[key].answers

            const createdAt = content[key].created_at.split(' ')[0].split('-')
            const date = `${createdAt[2]}/${createdAt[1]}/${createdAt[0]}`

            let submissionDetails = {}
            submissionDetails['submissionId'] = content[key].id
            submissionDetails['uploadDate'] = date
            submissionDetails['data'] = {}

            Object.keys(submission).map(key => {
                const question = submission[key];
                const questionName = question.name
                const questionAnswer = question.answer

                switch (questionName) {
                    case 'nameSurname':
                        submissionDetails['data'] = {
                            ...submissionDetails['data'],
                            [questionName]: {
                                'answer': `${questionAnswer['first']} ${questionAnswer['last']}`,
                                'qid': key
                            }
                        }
                        break;
                    case 'videoAudioOther':
                        if (questionAnswer.length !== 0) {
                            submissionDetails['data'] = {
                                ...submissionDetails['data'],
                                [questionName]: {
                                    'answer': questionAnswer,
                                    'qid': key
                                }
                            }
                        }
                        break;
                    case 'image':
                        if (questionAnswer !== undefined && questionAnswer !== null) {
                            submissionDetails['data'] = {
                                ...submissionDetails['data'],
                                [questionName]: {
                                    'answer': questionAnswer,
                                    'qid': key
                                }
                            }
                        }
                        break;
                    case 'tags':
                        const tags = JSON.parse(questionAnswer)
                        const tagsOfSubmission = tags.map(tag => {
                            Object.keys(tag).map(key => {
                                return tag[key]
                            })
                        })

                        submissionDetails['data'] = {
                            ...submissionDetails['data'],
                            [questionName]: {
                                'answer': tagsOfSubmission,
                                'qid': key
                            }
                        }
                        break;
                    default:
                        if (questionName !== 'mediaLibrary' && questionName !== 'submit') {
                            submissionDetails['data'] = {
                                ...submissionDetails['data'],
                                [questionName]: { 'answer': questionAnswer, 'qid': key }
                            }
                        }
                        break;
                }
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
