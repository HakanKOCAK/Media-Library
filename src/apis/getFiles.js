import axios from 'axios';
import { apiKey, formId } from '../config/config';
import getTags from '../Utils/getTags';

const normalizeResponse = (question, submissionDetails, key) => {
  let newSubmissionDetails = { ...submissionDetails };
  const { name: questionName, answer: questionAnswer } = question;
  const fileType = [];
  fileType.push(newSubmissionDetails.fileType);
  console.log('filetype', fileType);
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

        newSubmissionDetails.entity = {
          ...newSubmissionDetails.entity,
          qid: key,
          tags: getTags('imageOther', [...submittedTags]),
        };
      } else if (fileType.some((element) => ['Image', 'Other'].includes(element))) {
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

        newSubmissionDetails.entity = {
          ...newSubmissionDetails.entity,
          qid: key,
          tags: getTags('videoAudio', [...submittedTags]),
        };
      } else if (fileType.includes('Video/Audio')) {
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
    const errors = [];
    errors.push(res.data.message);
    return { success: false, errors };
  } catch (error) {
    const errors = [];
    errors.push(error);
    return { success: false, errors };
  }
}
