import React, { Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Spinner from '../spinner/Spinner';
import Video from './details/Video';
import Image from './details/Image';
import Other from './details/Other';
import EditableTags from './details/EditableTags';

import '../../styles/FileDetails.css';

const FileDetails = (props) => {
    const { id } = props.match.params

    const file = props.files.entities[id];

    //Upload date
    const uploadDate = file.uploadDate

    //Qid for the tags to be updated later
    const tagsQid = file.entity.qid

    //Submitter name
    const name = file.nameSurname

    //File Type
    const type = file.fileType

    //Set submitted tags
    const submittedTags = file.entity.tags

    const url = file.entity.url

    // const onEnter = (index) => {
    //     const arr = [];
    //     arr[index] = true;
    //     setVisible(arr);
    // }

    // const onLeave = (index) => {
    //     const arr = [];
    //     arr[index] = false;
    //     setEdit(arr)
    //     setVisible(arr);
    // }

    // const onChange = (event, index) => {

    //     let arr = []
    //     const { name, value } = event.currentTarget;

    //     if (name.includes('tag')) {
    //         arr = [...tags];
    //         arr[index] = value;
    //         setTags(arr);
    //     } else if (name.includes('start')) {
    //         arr = [...start];
    //         arr[index] = value;
    //         setStart(arr);
    //     } else {
    //         arr = [...end];
    //         arr[index] = value;
    //         setEnd(arr);
    //     }
    // }

    // const onDelete = (index) => {
    //     const arr = [...tags];
    //     arr.splice(index, 1);
    //     setTags(arr);
    //     setOriginalTags(arr);
    // }

    // const onSave = () => {
    //     setOriginalTags(tags);
    // }

    // const onEdit = (index) => {
    //     const arr = [...edit];
    //     arr[index] = true;
    //     setEdit(arr);
    // }

    // const onAdd = () => {
    //     const arr = [...tags];
    //     arr.push('');
    //     setTags(arr);
    //     setOriginalTags(arr);
    // }

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
                submittedTags={submittedTags}
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

export default FileDetails