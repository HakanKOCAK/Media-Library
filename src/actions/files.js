import axios from 'axios';
import { apiKey, formId } from '../config/config';
import { GET_FILES_SUCCESS, GET_FILES_FAIL } from './types';

export const getAllFiles = () => async dispatch => {
    try {
        const config = {
            params: {
                'Content-Type': 'application/json',
                'apiKey': apiKey
            }
        }
        const res = await (await axios.get(`https://api.jotform.com/form/${formId}/submissions`, config)).data.content
        let answers = []

        Object.keys(res).map(key => {
            const submission = res[key].answers
            let obj = {}
            let tagsOfSubmission = []
            Object.keys(submission).map(key => {
                if (submission[key].name !== 'mediaLibrary' && submission[key].name !== 'submit') {
                    if (submission[key].name === 'nameSurname') {
                        obj[submission[key].name] = `${submission[key].answer['first']} ${submission[key].answer['last']}`
                    } else if (submission[key].name === 'videoAudioOther' && submission[key].answer.length !== 0) {
                        obj[submission[key].name] = submission[key].answer
                    } else if (submission[key].name === 'image' && submission[key].answer !== undefined && submission[key].answer !== null) {
                        obj[submission[key].name] = submission[key].answer
                    } else if (submission[key].name !== 'image' && submission[key].name !== 'videoAudioOther' && submission[key].name !== 'tags') {
                        obj[submission[key].name] = submission[key].answer
                    } else if (submission[key].name === 'tags' && submission[key].answer !== undefined && submission[key].answer !== null) {
                        let tags = JSON.parse(submission[key].answer)
                        tags.map(tag => {
                            Object.keys(tag).map(key => {
                                tagsOfSubmission.push(tag[key])
                            })
                        })
                        obj[submission[key].name] = tagsOfSubmission
                    }
                }
            })
            answers.push(obj)
        })

        dispatch({
            type: GET_FILES_SUCCESS,
            payload: answers
        })
    } catch (error) {
        console.log(error)
        dispatch({
            type: GET_FILES_FAIL,
            payload: { status: error.response.status }
        })
    }
}
