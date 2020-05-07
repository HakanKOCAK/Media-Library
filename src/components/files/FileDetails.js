import React, { useState } from 'react';
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

    const file = props.files[id];

    console.log('details ', file)
    //Upload date
    const uploadDate = file.uploadDate

    //Details
    const details = file.data;

    //Qid for the tags to be updated later
    const tagsQid = details.tags.qid

    //Submitter name
    const name = details.nameSurname.answer

    //File Type
    const type = details.fileType.answer

    console.log('Type is:', type)
    //Set submitted tags
    const submittedTags = type === 'Video/Audio' ? details.tags.answer.map(element => { return element.tag }) : details.tags.answer

    //Start & end intervals for video/audio
    const submittedStartIntervals = []
    const submittedEndIntervals = []

    if (type === 'Video/Audio') {
        const fileTags = details.tags.answer
        fileTags.map(tag => {
            submittedStartIntervals.push(tag.start.trim())
            submittedEndIntervals.push(tag.end.trim())
        })
    }

    const url = type === 'Video/Audio'
        ?
        details.videoAudio.answer[0]
        :
        type === 'Other'
            ?
            details.otherDoc.answer[0]
            :
            details.image.answer

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

    if (!details) {
        return <Spinner />
    }

    return (
        <div>
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
            <EditableTags submittedTags={submittedTags} submittedStart={submittedStartIntervals} submittedEnd={submittedEndIntervals} type={type} />
        </div>
    )
}

FileDetails.propTypes = {
    files: PropTypes.object.isRequired,
    match: PropTypes.shape({
        params: PropTypes.shape({
            id: PropTypes.string.isRequired
        })
    }),
};

export default FileDetails