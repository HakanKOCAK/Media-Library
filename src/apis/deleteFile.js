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
      return { success: true, errors: null };
    }
    const errors = [];
    errors.push(data.message);
    return { success: false, errors };
  } catch (error) {
    const errors = [];
    errors.push(error);
    return { success: false, errors };
  }
}
