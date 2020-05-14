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
        if (data.responseCode === 401) {
            return { success: false, error: data.message }
        }

        return { success: true, error: null }
    } catch (error) {
        return { success: false, error: error };
    }
}