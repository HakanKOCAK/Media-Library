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
        const res = await (await axios.get(`https://api.jotform.com/form/${formId}/submissions`, config)).data

        console.log(res)
        const content = res.content

        let answers = []

        Object.keys(content).map(key => {
            const submission = content[key].answers

            const createdAt = content[key].created_at.split(' ')[0].split('-')
            const date = `${createdAt[2]}/${createdAt[1]}/${createdAt[0]}`

            let obj = {}
            let tagsOfSubmission = []
            obj['submissionId'] = content[key].id
            obj['uploadDate'] = date
            obj['data'] = {}
            Object.keys(submission).map(key => {
                if (submission[key].name !== 'mediaLibrary' && submission[key].name !== 'submit') {
                    if (submission[key].name === 'nameSurname') {
                        obj['data'] = { ...obj['data'], [submission[key].name]: { 'answer': `${submission[key].answer['first']} ${submission[key].answer['last']}`, 'qid': key } }
                    } else if (submission[key].name === 'videoAudioOther' && submission[key].answer.length !== 0) {
                        obj['data'] = { ...obj['data'], [submission[key].name]: { 'answer': submission[key].answer, 'qid': key } }
                    } else if (submission[key].name === 'image' && submission[key].answer !== undefined && submission[key].answer !== null) {
                        obj['data'] = { ...obj['data'], [submission[key].name]: { 'answer': submission[key].answer, 'qid': key } }
                    } else if (submission[key].name !== 'image' && submission[key].name !== 'videoAudioOther' && submission[key].name !== 'tags') {
                        obj['data'] = { ...obj['data'], [submission[key].name]: { 'answer': submission[key].answer, 'qid': key } }
                    } else if (submission[key].name === 'tags' && submission[key].answer !== undefined && submission[key].answer !== null) {
                        let tags = JSON.parse(submission[key].answer)
                        tags.map(tag => {
                            Object.keys(tag).map(key => {
                                tagsOfSubmission.push(tag[key])
                            })
                        })
                        obj['data'] = { ...obj['data'], [submission[key].name]: { 'answer': tagsOfSubmission, 'qid': key } }
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
        dispatch({
            type: GET_FILES_FAIL
        })
    }
}
