import axios from 'axios';
import { apiKey } from '../config/config';

export const updateTag = async ({ submissionId, qid, data }) => {

    console.log(data)
    const newTags = Object.values(data).reduce((newTags, item) => {
        const tag = item.tag
        let interval
        if (item.start && item.end) {
            const start = item.start.replace(/:/g, '-');
            const end = item.end.replace(/:/g, '-');
            interval = `${start}/${end}`
        }
        if (interval) {
            newTags.push({ "Tag": tag, "Interval": interval })
        } else {
            newTags.push({ "Tag": tag })
        }
        return newTags
    }, [])

    try {
        const res = await axios.post(`https://api.jotform.com/submission/${submissionId}?apiKey=${apiKey}&submission[${qid}]=${JSON.stringify(newTags)}`)

        const data = res.data

        if (data.responseCode === 200) {
            return { success: true, error: null }
        }

        return { success: false, error: data.message }
    } catch (error) {
        return { success: false, error: error }
    }
}