import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLongArrowAltLeft, faTrashAlt, faSave, faEdit, faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import ReactPlayer from 'react-player'
import PropTypes from 'prop-types';
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

    const [edit, setEdit] = useState([]);

    const [originalTags, setOriginalTags] = useState([])
    const [tags, setTags] = useState([])
    // eslint-disable-next-line no-unused-vars
    const [tagsId, setTagsId] = useState('')

    const [visible, setVisible] = useState([]);

    useEffect(() => {
        if (files) {
            setFile(files[id])
            setDetails(files[id].data)
        }
    }, [files])

    useEffect(() => {
        if (details) {
            setName(details.nameSurname.answer)
            setTags(details.tags.answer)
            setOriginalTags(details.tags.answer)
            setTagsId(details.tags.qid)
        }
    }, [details])

    const onEnter = (index) => {
        const arr = [];
        arr[index] = true;
        setVisible(arr);
    }

    const onLeave = (index) => {
        const arr = [];
        arr[index] = false;
        setEdit(arr)
        setVisible(arr);
    }

    const onChange = (event, index) => {
        const arr = [...tags];
        const { value } = event.currentTarget;
        arr[index] = value;
        setTags(arr);
    }

    const onDelete = (index) => {
        const arr = [...tags];
        arr.splice(index, 1);
        setTags(arr);
        setOriginalTags(arr);
    }

    const onSave = () => {
        setOriginalTags(tags);
    }

    const onEdit = (index) => {
        const arr = [...edit]
        arr[index] = true
        setEdit(arr)
    }

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
            <fieldset className='main'>
                <legend className='label'>Tags</legend>
                <div className='tagsContainer'>
                    {tags.map((t, index) => {
                        return (
                            <div key={index}
                                className={`tag 
                                ${edit[index]
                                        ?
                                        'edit'
                                        : ''
                                    }`
                                }
                                onMouseEnter={() => onEnter(index)}
                                onMouseLeave={() => onLeave(index)}
                            >
                                {
                                    originalTags[index] !== tags[index]
                                        ?
                                        <div className='iconContainer right'>
                                            <FontAwesomeIcon className='icon' icon={faSave} size="1x" onClick={() => onSave()} />
                                        </div>
                                        :
                                        null
                                }
                                <input disabled={!edit[index]} className={`tagInput 
                                ${edit[index]
                                        ?
                                        'edit'
                                        :
                                        ''
                                    }`
                                }
                                    name={`tag${index}`}
                                    type='text'
                                    value={t}
                                    onChange={event => onChange(event, index)}
                                />
                                {
                                    visible[index]
                                        ?
                                        <div className='iconContainer left'>
                                            {
                                                !edit[index]
                                                    ?
                                                    <FontAwesomeIcon className='icon' icon={faEdit}
                                                        size='1x' onClick={() => onEdit(index)} />

                                                    :
                                                    null
                                            }
                                            <FontAwesomeIcon className='icon' icon={faTrashAlt} size="1x" onClick={() => onDelete(index)} />
                                        </div>
                                        :
                                        null
                                }
                            </div>
                        )
                    })}
                    <FontAwesomeIcon style={{ marginTop: '5px' }} icon={faPlusCircle} size="lg" />
                </div>
            </fieldset>
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