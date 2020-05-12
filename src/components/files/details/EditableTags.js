import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faSave, faEdit, faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types';

const EditableTags = (props) => {

    const { submittedTags, type } = props;

    //To check if a tag is editing 
    const [edit, setEdit] = useState([]);

    //Set tags and their default value
    const [tags, setTags] = useState([]);

    //Check the start interval of a tag (video, audio)
    const [start, setStart] = useState([]);

    //Check the end interval of a tag (video, audio)
    const [end, setEnd] = useState([]);

    //To display edit and delete options of tags
    const [visible, setVisible] = useState([]);

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
    }

    const onSave = () => {
        console.log('saved')
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
    }

    useEffect(() => {
        setTags(submittedTags.map(tag => { return tag.tag }))
        setStart(submittedTags.map(tag => { return tag.start }))
        setEnd(submittedTags.map(tag => { return tag.end }))
    }, [props])

    return (
        <fieldset className='main'>
            <legend className='label'>Tags</legend>
            <div className='tagsContainer'>
                {tags.map((t, index) => {
                    return (
                        <div key={index}
                            className={`tag 
                                    ${edit[index] && type === 'Video/Audio'
                                    ?
                                    'editTagExtended'
                                    :
                                    edit[index]
                                        ?
                                        'editInput'
                                        :
                                        ''
                                }`
                            }
                            onMouseEnter={() => onEnter(index)}
                            onMouseLeave={() => onLeave(index)}
                        >
                            {
                                type === 'Other' || type === 'Image'
                                    ?
                                    submittedTags[index].tag !== tags[index]
                                        ?
                                        <div className='iconContainer right'>
                                            <FontAwesomeIcon className='icon' icon={faSave} size="1x" onClick={() => onSave()} />
                                        </div>
                                        :
                                        null
                                    :
                                    submittedTags[index].tag !== tags[index]
                                        ||
                                        submittedTags[index].start !== start[index]
                                        ||
                                        submittedTags[index].end !== end[index]
                                        ?
                                        <div className='iconContainer right'>
                                            <FontAwesomeIcon className='icon' icon={faSave} size="1x" onClick={() => onSave()} />
                                        </div>
                                        :
                                        null
                            }
                            <input disabled={!edit[index]}
                                className={`tagInput 
                                    ${
                                    edit[index]
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
                                edit[index] && type === 'Video/Audio'
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
        </fieldset >
    )
}

EditableTags.propTypes = {
    submittedStart: PropTypes.array.isRequired,
    submittedEnd: PropTypes.array.isRequired,
    submittedTags: PropTypes.array.isRequired,
    type: PropTypes.string.isRequired
}

export default EditableTags