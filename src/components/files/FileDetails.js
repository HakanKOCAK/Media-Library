import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons'
import ReactPlayer from 'react-player'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Spinner from '../spinner/Spinner';

import '../../styles/FileDetails.css';

const FileDetails = (props) => {
    const { id } = props.match.params

    const files = useSelector(({ files }) => files.entities)

    const [file, setFile] = useState(null);
    const [details, setDetails] = useState(null);

    const [name, setName] = useState('')
    const [nameId, setNameId] = useState('')

    const [tags, setTags] = useState([])
    const [tagsId, setTagsId] = useState('')

    useEffect(() => {
        setFile(files[id])
        setDetails(files[id].data)
    }, [files])

    useEffect(() => {
        if (details) {
            console.log(details)
            setName(details.nameSurname.answer)
            setNameId(details.nameSurname.qid)
            setTags(details.tags.answer)
            setTagsId(details.tags.qid)
        }
    }, [details])

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
            <div className='mediaContainer'>{details.image ?
                <img className='media' src={details.image.answer} /> :
                <ReactPlayer url={details.videoAudioOther.answer[0]} controls={true} />
            }
            </div>
        </div>
    )
}

export default FileDetails