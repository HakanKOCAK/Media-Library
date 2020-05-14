import axios from 'axios';
import { apiKey } from '../config/config';

export const updateTag = async ({ submissionId, qid, data }) => {

    const newTags = Object.values(data).reduce((newTags, item) => {
        const tag = item.tag
        newTags.push({ "Tag": tag })
        return newTags
    }, [])

    try {
        const res = await axios.post(`https://api.jotform.com/submission/${submissionId}?apiKey=${apiKey}&submission[${qid}]=${JSON.stringify(newTags)}`)
        console.log('res', res)
    } catch (error) {
        return { success: false, error: error }
    }
}