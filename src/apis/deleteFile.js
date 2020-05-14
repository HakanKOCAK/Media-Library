import axios from 'axios';
import { apiKey } from '../config/config';

export const deleteSubmittedFile = async (submissionId) => {
    try {
        const config = {
            params: {
                'apiKey': apiKey
            }
        }
        const res = await axios.delete(`https://api.jotform.com/submission/${submissionId}`, config)
        const data = res.data;
        if (data.responseCode === 200) {
            return { success: true, error: null }
        }
        return { success: true, error: data.message }
    } catch (error) {
        return { success: false, error: error };
    }
}