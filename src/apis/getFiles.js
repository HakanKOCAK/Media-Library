import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
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
          ...newSubmissionDetails.entities,
          url: questionAnswer[0],
        };
      }
      return newSubmissionDetails;
    case 'url':
      if (questionAnswer) {
        newSubmissionDetails.entity = {
          ...newSubmissionDetails.entity,
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
        let submittedTags = '';
        try {
          submittedTags = JSON.parse(questionAnswer);
        } catch (error) {
          newSubmissionDetails.entity = {
            ...newSubmissionDetails.entity,
            qid: key,
            tags: {},
          };
          return newSubmissionDetails;
        }

        const getTagsOfSubmission = (tags) => {
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
          tags: getTagsOfSubmission([...submittedTags]),
        };
      } else if (newSubmissionDetails.fileType.includes(['Image', 'Other'])) {
        newSubmissionDetails.entity = {
          ...newSubmissionDetails.entity,
          qid: key,
          tags: {},
        };
      }
      return newSubmissionDetails;
    case 'tagsVideoAudio':
      if (questionAnswer) {
        let submittedTags = '';
        try {
          submittedTags = JSON.parse(questionAnswer);
        } catch (error) {
          newSubmissionDetails.entity = {
            ...newSubmissionDetails.entity,
            qid: key,
            tags: {},
          };
          return newSubmissionDetails;
        }

        const getTagsOfSubmission = (tags) => {
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
          tags: getTagsOfSubmission([...submittedTags]),
        };
      } else if (newSubmissionDetails.fileType === 'Video/Audio') {
        newSubmissionDetails.entity = {
          ...newSubmissionDetails.entity,
          qid: key,
          tags: {},
        };
      }
      return newSubmissionDetails;
    case 'mediaLibrary':
    case 'submit':
    case 'localOrUrl':
      return newSubmissionDetails;
    default:
      newSubmissionDetails = {
        ...newSubmissionDetails,
        [questionName]: questionAnswer,
      };
      return newSubmissionDetails;
  }
};

const getAnswers = async (data) => data.reduce((answers, submissionDetails) => {
  const newAnswers = { ...answers };
  const submission = submissionDetails.answers;
  const createdAt = submissionDetails.created_at.split(' ')[0].split('-');
  const date = `${createdAt[2]}/${createdAt[1]}/${createdAt[0]}`;
  const reduceSubmissionDetails = Object.entries(submission).reduce((newSubmissionDetails, value) => {
    const key = value[0];
    const question = value[1];
    const newData = normalizeResponse(question, { ...newSubmissionDetails }, key);
    return {
      submissionId: submissionDetails.id,
      uploadDate: date,
      ...newData,
    };
  }, {});
  newAnswers[submissionDetails.id] = reduceSubmissionDetails;
  return newAnswers;
}, {});

const getFileName = (url) => {
  const splittedUrl = url.split('/');
  return splittedUrl[splittedUrl.length - 1];
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


      const updatedAnswers = (data) => {
        const newData = { ...data };
        Object.entries(newData).forEach(([key, value]) => {
          newData[key].entity = { ...newData[key].entity, fileName: getFileName(value.entity.url) };
        });
        return newData;
      };

      const answersWithNames = { ...updatedAnswers({ ...answers }) };

      return { success: true, data: answersWithNames };
    }
    return { success: false, error: res.data.message };
  } catch (error) {
    return { success: false, error };
  }
}
