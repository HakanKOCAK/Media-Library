import getTags from './getTags';

export default function normalizeResponse(question, submissionDetails, key) {
  let newSubmissionDetails = { ...submissionDetails };
  const { name: questionName, answer: questionAnswer } = question;
  const fileType = [];
  fileType.push(newSubmissionDetails.fileType);
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
}
