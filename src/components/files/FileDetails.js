import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Spinner from '../spinner/Spinner';
import Video from './details/Video';
import Image from './details/Image';
import Other from './details/Other';
import EditableTags from './details/EditableTags';

import '../../styles/FileDetails.css';

const FileDetails = (props) => {
    const { id } = props.match.params

    const files = useSelector(({ files }) => files.entities)

    //File and its details
    const [file, setFile] = useState(null);
    const [details, setDetails] = useState(null);

    //Submitter name
    const [name, setName] = useState('');

    //Set tags and their default value
    const [submittedTags, setSubmittedTags] = useState([]);

    const [url, setUrl] = useState('')

    //Check the start interval of a tag (video, audio)
    const [submittedStart, setSubmittedStart] = useState([]);

    //Check the end interval of a tag (video, audio)
    const [submittedEnd, setSubmittedEnd] = useState([]);

    // eslint-disable-next-line no-unused-vars
    const [tagsId, setTagsId] = useState('');

    const [type, setType] = useState('');

    useEffect(() => {
        if (files) {
            setFile(files[id])
            setDetails(files[id].data)
        }
    }, [files])

    useEffect(() => {
        if (details) {
            setName(details.nameSurname.answer)
            setType(details.fileType.answer)

            details.videoAudio
                ?
                setUrl(details.videoAudio.answer[0])
                :
                details.otherDoc
                    ?
                    setUrl(details.otherDoc.answer[0])
                    :
                    setUrl(details.image.answer)

            if (details.tags) {
                const fileTags = details.tags.answer
                if (details.fileType.answer === 'Video/Audio') {
                    const tagsArray = []
                    const startArray = []
                    const endArray = []
                    fileTags.map(tag => {
                        tagsArray.push(tag.tag)
                        startArray.push(tag.start.trim())
                        endArray.push(tag.end.trim())
                    })
                    setSubmittedTags(tagsArray)
                    setSubmittedStart(startArray)
                    setSubmittedEnd(endArray)
                } else {
                    setSubmittedTags(fileTags)
                }
                setTagsId(details.tags.qid)
            }
        }
    }, [details])

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
            <p className='p1'>Submitted by {name} at {file.uploadDate}</p>
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
            <EditableTags submittedTags={submittedTags} submittedStart={submittedStart} submittedEnd={submittedEnd} type={type} />
        </div>
    )
}

FileDetails.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            id: PropTypes.string.isRequired
        })
    }),
};

export default FileDetails