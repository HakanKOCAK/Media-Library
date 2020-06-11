import axios from 'axios';
import { apiKey, formId } from '../config/config';
import getAnswers from '../Utils/getAnswers';

export default async function getFiles(offset, limit) {
  try {
    const config = {
      params: {
        apiKey,
        offset,
        limit,
      },
    };

    let noMore = false;
    const res = await axios.get(`https://api.jotform.com/form/${formId}/submissions`, config);
    if (res.data.responseCode === 200) {
      const content = [...res.data.content];
      if (content.length < limit) {
        noMore = true;
      }
      const answers = await getAnswers(content);

      const updatedAnswers = (data) => {
        const getFileName = (url) => {
          const splittedUrl = url.split('/');
          return splittedUrl[splittedUrl.length - 1];
        };

        const newData = { ...data };
        Object.entries(newData).forEach(([key, value]) => {
          newData[key].entity = { ...newData[key].entity, fileName: getFileName(value.entity.url) };
        });
        return newData;
      };

      const answersWithNames = { ...updatedAnswers({ ...answers }) };
      return { success: true, data: answersWithNames, noMore };
    }
    const errors = [];
    errors.push(res.data.message);
    return { success: false, errors };
  } catch (error) {
    const errors = [];
    errors.push(error);
    return { success: false, errors };
  }
}
