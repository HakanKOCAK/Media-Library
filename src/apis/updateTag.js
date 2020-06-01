import axios from 'axios';
import { apiKey } from '../config/config';
import { formatCheckToFromForm } from '../Utils/regExp';

export default async function updateTag({ submissionId, qid, data }) {
  const newTags = Object.values(data).reduce((reducedTags, item) => {
    const { tag } = item;
    let interval;
    if (item.start && item.end) {
      const start = item.start.replace(/:/g, '-');
      const end = item.end.replace(/:/g, '-');
      interval = `${start}/${end}`;
    }
    if (interval) {
      reducedTags.push({ Tag: tag, Interval: interval });
    } else {
      reducedTags.push({ Tag: tag });
    }
    return reducedTags;
  }, []);

  try {
    let flag = false;
    const errors = [];
    newTags.forEach((item) => {
      if (item.Interval) {
        if (!formatCheckToFromForm(item.Interval)) {
          console.log('here');
          flag = true;
          errors.push('Interval format is: 00:00:00');
        }
      } else {
        errors.push('Interval cannot be empty.');
      }

      if (!item.Tag) {
        flag = true;
        errors.push('Tag cannot be empty');
      }
    });

    if (flag) {
      return { success: false, errors };
    }

    const res = await axios.post(`https://api.jotform.com/submission/${submissionId}?apiKey=${apiKey}&submission[${qid}]=${JSON.stringify(newTags)}`);

    const { data: responseData } = res;

    if (responseData.responseCode === 200) {
      return { success: true, errors: null };
    }
    errors.push(responseData.message);
    return { success: false, errors };
  } catch (error) {
    const errors = [];
    errors.push(error);
    return { success: false, errors };
  }
}
