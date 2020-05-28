import axios from 'axios';
import { apiKey } from '../config/config';

export default async function deleteSubmittedFile(submissionId) {
  try {
    const config = {
      params: {
        apiKey,
      },
    };
    const res = await axios.delete(`https://api.jotform.com/submission/${submissionId}`, config);
    const { data } = res;
    if (data.responseCode === 200) {
      return { success: true, error: null };
    }
    return { success: false, error: data.message };
  } catch (error) {
    return { success: false, error };
  }
}
