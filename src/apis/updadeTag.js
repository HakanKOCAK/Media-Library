import axios from 'axios';
import { apiKey } from '../config/config';

// You have a typo on file name.
export const updateTag = async ({ submissionId, qid, data }) => {

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

        let flag = false;
        const types = [];
        newTags.forEach(item => {
            if (!/^((?:[01]\d|2[0-3])-[0-5]\d-[0-5]\d)\/((?:[01]\d|2[0-3])-[0-5]\d-[0-5]\d)$/g.test(item.Interval)) { // It seems you've used this regexp somewhere else. Extract a function and use
                // it from there
                flag = true;
                types.push('interval');
            }

            if (!item.Tag) {
                flag = true;
                types.push('tag');
            }
        });


        if (flag) {
            return { success: false, error: 'Wrong input type', types: types }
        }

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
