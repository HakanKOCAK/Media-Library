import normalizeResponse from './normalizeResponse';

export default async function getAnswers(data) {
  return data.reduce((answers, submissionDetails) => {
    const newAnswers = { ...answers };
    const submission = submissionDetails.answers;
    const createdAt = submissionDetails.created_at.split(' ')[0].split('-');
    const date = `${createdAt[2]}/${createdAt[1]}/${createdAt[0]}`;
    const reduceSubmissionDetails = Object.entries(submission)
      .reduce((newSubmissionDetails, value) => {
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
}
