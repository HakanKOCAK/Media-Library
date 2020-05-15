import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Spinner from '../spinner/Spinner';
import Video from './details/Video';
import Image from './details/Image';
import Other from './details/Other';
import EditableTags from './details/EditableTags';
import { deleteTag } from '../../actions/files';
import { updateTag } from '../../apis/updadeTag';
import { setError } from '../../actions/error';
import { SAVE_TAG_REQUEST, SAVE_TAG_ERROR, SAVE_TAG_SUCCESS, DELETE_TAG_SUCCESS, DELETE_TAG_ERROR } from '../../actions/types';

import '../../styles/FileDetails.css';

const FileDetails = (props) => {
    const dispatch = useDispatch()
    const { id } = props.match.params

    const files = props.files
    const file = files.entities[id];

    //Upload date
    const uploadDate = file.uploadDate

    //Qid for the tags to be updated later
    const tagsQid = file.entity.qid

    //Submitter name
    const name = file.nameSurname

    //File Type
    const type = file.fileType

    //Set submitted tags
    const [tags, setTags] = useState(file.entity.tags)

    const url = file.entity.url

    const onDelete = async (tagId, isNew) => {

        if (!isNew) {
            dispatch(deleteTag({ submissionId: id, tagId: tagId }))
            const newTags = props.files.entities[id].entity.tags
            const response = await updateTag({ submissionId: id, qid: tagsQid, data: newTags })
            if (!response.success) {
                dispatch({
                    type: DELETE_TAG_ERROR
                })
                dispatch(setError(response.error))
            } else {
                dispatch({
                    type: DELETE_TAG_SUCCESS
                })
            }
        } else {
            const newTags = {}
            Object.entries(tags).forEach(([key, value]) => {
                if (key !== tagId) {
                    newTags[key] = value
                }
            })
            setTags(newTags)
        }
    }

    const onSave = async (key) => {
        dispatch({
            type: SAVE_TAG_REQUEST,
            payload: { submissionId: id, tagId: key, tag: tags[key] }
        })
        const newTags = props.files.entities[id].entity.tags
        const response = await updateTag({ submissionId: id, qid: tagsQid, data: newTags })

        if (!response.success) {
            dispatch({
                type: SAVE_TAG_ERROR
            })
            dispatch(setError(response.error))
        } else {
            dispatch({
                type: SAVE_TAG_SUCCESS
            })
        }
    }

    const onChange = (type, key, value) => {
        const newTags = { ...tags }
        newTags[key].edited = true
        if (type === 'tag') {
            newTags[key].tag = value
        } else if (type === 'start') {
            newTags[key].start = value
        } else {
            newTags[key].end = value
        }
        setTags(newTags)
    }

    const onAdd = (data) => {
        const newTags = { ...tags }
        newTags[data.tagId] = data.tag
        setTags(newTags)
    }

    useEffect(() => {
        setTags(files.entities[id].entity.tags);
    }, [files])
    if (!file) {
        return <Spinner />
    }

    return (
        <Fragment>
            <Link to="/files" className="link">
                <FontAwesomeIcon icon={faLongArrowAltLeft} size="lg" />
                <span className="mx-05">Back to Files</span>
            </Link>
            <h1 className='h1'>Details</h1>
            <p className='p1'>Submitted by {name} at {uploadDate}</p>
            {
                type === 'Image'
                    ?
                    <Image url={url} />
                    :
                    type === 'Video/Audio'
                        ?
                        <Video url={url} />
                        :
                        <Other url={url} />
            }
            <EditableTags
                tags={tags}
                onTagDelete={onDelete}
                onTagAdd={onAdd}
                onTagChange={onChange}
                onTagSave={onSave}
                type={type}
            />
        </Fragment>
    )
}

FileDetails.propTypes = {
    files: PropTypes.shape({
        entities: PropTypes.object.isRequired
    }),
    match: PropTypes.shape({
        params: PropTypes.shape({
            id: PropTypes.string.isRequired
        })
    }),
};


FileDetails.defaultProps = {
    files: {}
}

export default FileDetails;