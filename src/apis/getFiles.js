import axios from 'axios';
import { apiKey, formId } from '../config/config';
import { v4 as uuidv4 } from 'uuid';
import pretty from 'prettysize';
const normalizeResponse = (question, submissionDetails, key) => {
    const { name: questionName, answer: questionAnswer } = question;
    switch (questionName) {
        case 'nameSurname':
            submissionDetails = {
                ...submissionDetails,
                [questionName]: `${questionAnswer['first']} ${questionAnswer['last']}`
            }
            return submissionDetails
        case 'otherDoc':
        case 'videoAudio':
            if (questionAnswer.length) {
                submissionDetails.entity = {
                    ...submissionDetails.entites,
                    url: questionAnswer[0]
                }
            }
            return submissionDetails;
        case 'image':
            if (questionAnswer) {
                submissionDetails.entity = {
                    ...submissionDetails.entity,
                    url: questionAnswer
                }
            }
            return submissionDetails;
        case 'tagsImageOther':
            if (questionAnswer) {
                try {
                    const submittedTags = JSON.parse(questionAnswer);
                    const tagsOfSubmission = tags => {
                        const newTags = tags.reduce((newTags, item) => {
                            const keys = Object.keys(item)
                            newTags[uuidv4()] =
                                keys.reduce((newObject, key) => {
                                    const answer = item[key]
                                    return { ...newObject, tag: answer }
                                }, {})
                            return newTags;
                        }, {})
                        return newTags;
                    }
                    submissionDetails.entity = {
                        ...submissionDetails.entity,
                        qid: key,
                        tags: tagsOfSubmission([...submittedTags])
                    }
                } catch (error) {
                    console.log(error);
                    submissionDetails.entity = {
                        ...submissionDetails.entity,
                        qid: key,
                        tags: {}
                    }
                }
            } else if (submissionDetails.fileType === 'Image' || submissionDetails.fileType === 'Other') {
                submissionDetails.entity = {
                    ...submissionDetails.entity,
                    qid: key,
                    tags: []
                }
            }
            return submissionDetails
        case 'tagsVideoAudio':
            if (questionAnswer) {
                try {
                    const submittedTags = JSON.parse(questionAnswer);
                    const tagsOfSubmission = tags => {
                        const newTags = tags.reduce((newTags, item) => {
                            const keys = Object.keys(item)
                            newTags[uuidv4()] =
                                keys.reduce((newObject, key) => {
                                    const answer = item[key]
                                    if (key === 'Tag') {
                                        return { ...newObject, tag: answer }
                                    } else {
                                        const trimmed = answer.trim();
                                        const intervals = trimmed.split('/')
                                        const start = intervals[0].trim();
                                        const end = intervals[1].trim();
                                        const startMinSec = start.split('-');
                                        const endMinSec = end.split('-');
                                        return {
                                            ...newObject,
                                            start: `${startMinSec[0]}:${startMinSec[1]}:${startMinSec[2]}`,
                                            end: `${endMinSec[0]}:${endMinSec[1]}:${endMinSec[1]}`
                                        }
                                    }
                                }, {})

                            return newTags;
                        }, {})
                        return newTags;
                    }
                    submissionDetails.entity = {
                        ...submissionDetails.entity,
                        qid: key,
                        tags: tagsOfSubmission([...submittedTags])
                    }
                } catch (error) {
                    console.log(error);
                    submissionDetails.entity = {
                        ...submissionDetails.entity,
                        qid: key,
                        tags: {}
                    }
                }
            } else if (submissionDetails.fileType === 'Video/Audio') {
                submissionDetails.entity = {
                    ...submissionDetails.entity,
                    qid: key,
                    tags: []
                }
            }
            return submissionDetails
        default:
            if (questionName !== 'mediaLibrary' && questionName !== 'submit') {
                return submissionDetails = {
                    ...submissionDetails,
                    [questionName]: questionAnswer
                }
            }
            return submissionDetails;
    }
}

const getAnswers = async data => {
    return data.reduce((answers, item) => {
        const submission = item.answers
        const createdAt = item.created_at.split(' ')[0].split('-')
        const date = `${createdAt[2]}/${createdAt[1]}/${createdAt[0]}`

        const submissionDetails = Object.entries(submission).reduce((submissionDetails, value) => {
            const key = value[0]
            const question = value[1]
            const data = normalizeResponse(question, { ...submissionDetails }, key)
            return {
                submissionId: item.id,
                uploadDate: date,
                ...data
            };
        }, {})
        answers[item.id] = submissionDetails
        return answers
    }, {})
}
export const getFiles = async () => {
    try {
        const config = {
            params: {
                'apiKey': apiKey
            }
        }

        const res = await axios.get(`https://api.jotform.com/form/${formId}/submissions`, config)
        if (res.data.responseCode === 200) {
            const content = res.data.content
            const answers = await getAnswers(Object.values(content))

            const sizes = await getFileSizesAndNames({ ...answers })

            const updatedAnswers = (data, sizes) => {
                sizes.forEach(item => {
                    data[item['key']].entity = { ...data[item['key']].entity, size: item['size'] }
                })

                return data;
            }

            const answersWithSizes = { ...updatedAnswers({ ...answers }, [...sizes]) }

            return { success: true, data: answersWithSizes }
        }
        return { success: false, error: res.data.message }
    } catch (error) {
        return { success: false, error: error }
    }
}

const getFileName = (url) => {
    return url.split('/')[url.split('/').length - 1]
}
const getFileSizesAndNames = async (files) => {
    const data = Promise.all(
        Object.keys(files).map(async (key) => {
            const file = files[key]
            const url = file.entity.url
            const name = getFileName(url);
            file.entity.fileName = name

            const resp = await axios({
                method: 'get',
                url: url,
                responseType: 'blob'
            })

            const size = resp.data.size

            return { key: key, size: pretty(size, false, false, 2) }
        })
    )

    return Promise.resolve(data);
}
