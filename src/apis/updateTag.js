import axios from 'axios';
import { apiKey } from '../config/config';

function checkFormat(interval) {
  return /^((?:[01]\d|2[0-3])-[0-5]\d-[0-5]\d)\/((?:[01]\d|2[0-3])-[0-5]\d-[0-5]\d)$/g.test(interval);
}

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
    const types = [];
    newTags.forEach((item) => {
      if (item.Interval) {
        if (!checkFormat(item.Interval)) {
          flag = true;
          types.push('interval');
        }
      }

      if (!item.Tag) {
        flag = true;
        types.push('tag');
      }
    });

    if (flag) {
      return { success: false, error: 'Wrong input type', types };
    }

    const res = await axios.post(`https://api.jotform.com/submission/${submissionId}?apiKey=${apiKey}&submission[${qid}]=${JSON.stringify(newTags)}`);

    const { data: responseData } = res;

    if (responseData.responseCode === 200) {
      return { success: true, error: null };
    }

    return { success: false, error: data.message };
  } catch (error) {
    return { success: false, error };
  }
}
