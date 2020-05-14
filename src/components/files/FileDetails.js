import React, { Fragment } from 'react';
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
import { deleteTag, saveTag } from '../../actions/files';
import { updateTag } from '../../apis/updadeTag';
import { setError } from '../../actions/error';

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
    let tags = file.entity.tags

    const url = file.entity.url

    const onDelete = async (tagId) => {
        await deleteTag({ submissionId: id, tagId: tagId })(dispatch)
        const newTags = props.files.entities[id].entity.tags
        const response = await updateTag({ submissionId: id, qid: tagsQid, data: newTags })

        if (!response.success) {
            dispatch(setError(response.error))
        }
    }

    const onSave = async (data) => {
        dispatch(saveTag({ submissionId: id, data: data }))
        const newTags = props.files.entities[id].entity.tags
        const response = await updateTag({ submissionId: id, qid: tagsQid, data: newTags })

        if (!response.success) {
            dispatch(setError(response.error))
        }
    }

    const onAdd = (data) => {
        dispatch(saveTag({ submissionId: id, data: data }))
    }

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