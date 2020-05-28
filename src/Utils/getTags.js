import { v4 as uuidv4 } from 'uuid';

export default function getTags(type, data) {
  const newTags = data.reduce((reducedTags, item) => {
    const returnedObject = { ...reducedTags };
    const keys = Object.keys(item);
    returnedObject[uuidv4()] = keys.reduce((newObject, itemKey) => {
      const answer = item[itemKey];
      if (itemKey === 'Tag') {
        return { ...newObject, tag: answer };
      }
      if (type === 'videoAudio') {
        if (answer && /^((?:[01]\d|2[0-3])-[0-5]\d-[0-5]\d)\/((?:[01]\d|2[0-3])-[0-5]\d-[0-5]\d)$/g.test(answer)
        ) {
          const trimmed = answer.trim();
          const intervals = trimmed.split('/');
          const start = intervals[0].trim();
          const end = intervals[1].trim();
          const startMinSec = start.split('-');
          const endMinSec = end.split('-');
          return {
            ...newObject,
            start: `${startMinSec[0]}:${startMinSec[1]}:${startMinSec[2]}`,
            end: `${endMinSec[0]}:${endMinSec[1]}:${endMinSec[2]}`,
          };
        }
        return {
          ...newObject,
          start: '00:00:00',
          end: '00:00:00',
        };
      }
      return { ...newObject };
    }, {});

    return returnedObject;
  }, {});
  return newTags;
}