import React, { useEffect, useState, Suspense, lazy } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLongArrowAltLeft, faTrashAlt, faSave, faEdit, faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import ReactPlayer from 'react-player'
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Spinner from '../spinner/Spinner';

import '../../styles/FileDetails.css';

const Image = lazy(() => import('../Image'));

const FileDetails = (props) => {
    const { id } = props.match.params

    const files = useSelector(({ files }) => files.entities)

    //File and its details
    const [file, setFile] = useState(null);
    const [details, setDetails] = useState(null);

    //Submitter name
    const [name, setName] = useState('');

    //To check if a tag is editing 
    const [edit, setEdit] = useState([]);

    //Set tags and their default value
    const [originalTags, setOriginalTags] = useState([]);
    const [tags, setTags] = useState([]);

    //Check the start interval of a tag (video, audio)
    const [originalStart, setOriginalStart] = useState([]);
    const [start, setStart] = useState([]);

    //Check the end interval of a tag (video, audio)
    const [originalEnd, setOriginalEnd] = useState([]);
    const [end, setEnd] = useState([]);

    //to check if image completely loaded
    const [loaded, setLoaded] = useState(false);

    // eslint-disable-next-line no-unused-vars
    const [tagsId, setTagsId] = useState('');

    //To display edit and delete options of tags
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
            if (details.tags) {
                if (details.fileType.answer === 'Video/Audio') {
                    const fileTags = details.tags.answer
                    const tagsArray = []
                    const startArray = []
                    const endArray = []
                    fileTags.map(tag => {
                        tagsArray.push(tag.tag)
                        startArray.push(tag.start.trim())
                        endArray.push(tag.end.trim())
                    })
                    setTags(tagsArray)
                    setOriginalTags(tagsArray)

                    setStart(startArray)
                    setOriginalStart(startArray)

                    setEnd(endArray)
                    setOriginalEnd(endArray)
                } else {
                    setTags(details.tags.answer)
                    setOriginalTags(details.tags.answer)
                }
                setTagsId(details.tags.qid)
            }
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

        let arr = []
        const { name, value } = event.currentTarget;

        if (name.includes('tag')) {
            arr = [...tags];
            arr[index] = value;
            setTags(arr);
        } else if (name.includes('start')) {
            arr = [...start];
            arr[index] = value;
            setStart(arr);
        } else {
            arr = [...end];
            arr[index] = value;
            setEnd(arr);
        }
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
        const arr = [...edit];
        arr[index] = true;
        setEdit(arr);
    }

    const onAdd = () => {
        const arr = [...tags];
        arr.push('');
        setTags(arr);
        setOriginalTags(arr);
    }

    const handleImageLoaded = () => {
        setLoaded(true);
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
            <div className='mediaContainer'>
                {
                    details.image
                        ?
                        <Suspense fallback={<Spinner styled={true} />}>
                            <Image image={details.image.answer} />
                        </Suspense>
                        :
                        details.videoAudio
                            ?
                            <ReactPlayer url={details.videoAudio.answer[0]} controls={true}
                            />
                            :
                            <div>DOOOC</div>
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
                                        details.videoAudio
                                            ?
                                            'editTagExtended'
                                            :
                                            'editTag'
                                        :
                                        ''
                                    }`
                                }
                                onMouseEnter={() => onEnter(index)}
                                onMouseLeave={() => onLeave(index)}
                            >
                                {
                                    originalTags[index] !== tags[index]
                                        ||
                                        originalStart[index] !== start[index]
                                        ||
                                        originalEnd[index] !== end[index]
                                        ?
                                        <div className='iconContainer right'>
                                            <FontAwesomeIcon className='icon' icon={faSave} size="1x" onClick={() => onSave()} />
                                        </div>
                                        :
                                        null
                                }
                                <input disabled={!edit[index]}
                                    className={`tagInput 
                                    ${edit[index]
                                            ?
                                            'editInput'
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
                                {
                                    edit[index] && details.videoAudio
                                        ?
                                        <div className='intervalContainer'>
                                            <input className='intervalInput'
                                                name={`start${index}`}
                                                type='text'
                                                value={start[index]}
                                                onChange={event => onChange(event, index)}
                                            />
                                                /
                                                <input className='intervalInput'
                                                name={`end${index}`}
                                                type='text'
                                                value={end[index]}
                                                onChange={event => onChange(event, index)}
                                            />
                                        </div>
                                        :
                                        null
                                }
                            </div>
                        )
                    })}
                    <div style={{ width: '210px', display: 'flex', justifyContent: 'center' }}>
                        <FontAwesomeIcon
                            style={{ marginTop: '5px' }}
                            icon={faPlusCircle}
                            size="lg"
                            onClick={() => onAdd()}
                        />
                    </div>
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