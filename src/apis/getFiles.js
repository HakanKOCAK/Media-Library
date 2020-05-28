import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import pretty from 'prettysize';
import { apiKey, formId } from '../config/config';

const normalizeResponse = (question, submissionDetails, key) => {
  let newSubmissionDetails = { ...submissionDetails };
  const { name: questionName, answer: questionAnswer } = question;
  switch (questionName) {
    case 'nameSurname':
      newSubmissionDetails = {
        ...newSubmissionDetails,
        [questionName]: `${questionAnswer.first} ${questionAnswer.last}`,
      };
      return newSubmissionDetails;
    case 'otherDoc':
    case 'videoAudio':
      if (questionAnswer.length) {
        newSubmissionDetails.entity = {
          ...newSubmissionDetails.entites,
          url: questionAnswer[0],
        };
      }
      return newSubmissionDetails;
    case 'url':
      if (questionAnswer) {
        newSubmissionDetails.entity = {
          ...newSubmissionDetails.entites,
          url: questionAnswer,
          videoByUrl: true,
        };
      }
      return newSubmissionDetails;
    case 'image':
      if (questionAnswer) {
        newSubmissionDetails.entity = {
          ...newSubmissionDetails.entity,
          url: questionAnswer,
        };
      }
      return newSubmissionDetails;
    case 'tagsImageOther':
      if (questionAnswer) {
        try {
          const submittedTags = JSON.parse(questionAnswer);
          const tagsOfSubmission = (tags) => {
            const newTags = tags.reduce((reducedTags, item) => {
              const returnedObject = { ...reducedTags };
              const keys = Object.keys(item);
              returnedObject[uuidv4()] = keys.reduce((newObject, itemKey) => {
                const answer = item[itemKey];
                return { ...newObject, tag: answer };
              }, {});
              return returnedObject;
            }, {});
            return newTags;
          };

          newSubmissionDetails.entity = {
            ...newSubmissionDetails.entity,
            qid: key,
            tags: tagsOfSubmission([...submittedTags]),
          };
        } catch (error) {
          newSubmissionDetails.entity = {
            ...newSubmissionDetails.entity,
            qid: key,
            tags: {},
          };
        }
      } else if (newSubmissionDetails.fileType === 'Image' || newSubmissionDetails.fileType === 'Other') {
        newSubmissionDetails.entity = {
          ...newSubmissionDetails.entity,
          qid: key,
          tags: [],
        };
      }
      return newSubmissionDetails;
    case 'tagsVideoAudio':
      if (questionAnswer) {
        try {
          const submittedTags = JSON.parse(questionAnswer);
          const tagsOfSubmission = (tags) => {
            const newTags = tags.reduce((reducedTags, item) => {
              const returnedObject = { ...reducedTags };
              const keys = Object.keys(item);
              returnedObject[uuidv4()] = keys.reduce((newObject, itemKey) => {
                const answer = item[itemKey];
                if (itemKey === 'Tag') {
                  return { ...newObject, tag: answer };
                }
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
              }, {});

              return returnedObject;
            }, {});
            return newTags;
          };

          newSubmissionDetails.entity = {
            ...newSubmissionDetails.entity,
            qid: key,
            tags: tagsOfSubmission([...submittedTags]),
          };
        } catch (error) {
          newSubmissionDetails.entity = {
            ...newSubmissionDetails.entity,
            qid: key,
            tags: {},
          };
        }
      } else if (newSubmissionDetails.fileType === 'Video/Audio') {
        newSubmissionDetails.entity = {
          ...newSubmissionDetails.entity,
          qid: key,
          tags: [],
        };
      }
      return newSubmissionDetails;
    default:
      if (questionName !== 'mediaLibrary' && questionName !== 'submit' && questionName !== 'localOrUrl') {
        newSubmissionDetails = {
          ...newSubmissionDetails,
          [questionName]: questionAnswer,
        };
      }
      return newSubmissionDetails;
  }
};

const getAnswers = async (data) => data.reduce((answers, item) => {
  const newAnswers = { ...answers };
  const submission = item.answers;
  const createdAt = item.created_at.split(' ')[0].split('-');
  const date = `${createdAt[2]}/${createdAt[1]}/${createdAt[0]}`;

  const submissionDetails = Object.entries(submission).reduce((newSubmissionDetails, value) => {
    const key = value[0];
    const question = value[1];
    const newData = normalizeResponse(question, { ...newSubmissionDetails }, key);
    return {
      submissionId: item.id,
      uploadDate: date,
      ...newData,
    };
  }, {});
  newAnswers[item.id] = submissionDetails;
  return newAnswers;
}, {});

const getFileName = (url) => url.split('/')[url.split('/').length - 1];
const getFileSizesAndNames = async (files) => {
  const data = Promise.all(
    Object.keys(files).map(async (key) => {
      const file = files[key];
      const { url } = file.entity;
      const name = getFileName(url);
      file.entity.fileName = name;
      const { videoByUrl } = file.entity;
      if (!videoByUrl) {
        const resp = await axios({
          method: 'get',
          url,
          responseType: 'blob',
        });

        const { size } = resp.data;

        return { key, size: pretty(size, false, false, 2) };
      }

      return { key, size: 'N/A' };
    }),
  );

  return Promise.resolve(data);
};

export default async function getFiles() {
  try {
    const config = {
      params: {
        apiKey,
      },
    };

    const res = await axios.get(`https://api.jotform.com/form/${formId}/submissions`, config);
    if (res.data.responseCode === 200) {
      const content = { ...res.data.content };
      const answers = await getAnswers(Object.values(content));

      const sizes = await getFileSizesAndNames({ ...answers });

      const updatedAnswers = (data) => {
        const newData = { ...data };
        sizes.forEach((item) => {
          newData[item.key].entity = { ...data[item.key].entity, size: item.size };
        });

        return newData;
      };

      const answersWithSizes = { ...updatedAnswers({ ...answers }) };

      return { success: true, data: answersWithSizes };
    }
    return { success: false, error: res.data.message };
  } catch (error) {
    return { success: false, error };
  }
}
