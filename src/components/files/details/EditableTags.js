import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faSave, faEdit, faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types';

const EditableTags = (props) => {

    const { tags, type, onTagDelete, onTagAdd, onTagSave } = props;

    console.log(tags)
    //To check if a tag is editing 
    const [edit, setEdit] = useState([]);

    //tags and  value
    const [displayTags, setTags] = useState({ ...tags })
    console.log('display', displayTags)
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

    const onChange = (event, key) => {

        const arr = { ...displayTags }
        const { name, value } = event.currentTarget;

        if (name.includes('tag')) {
            arr[key].tag = value;
        } else if (name.includes('start')) {
            arr[key].start = value;
        } else {
            arr[key].end = value;
        }

        setTags(arr);
    }

    const onDelete = (tagId) => {
        const obj = { ...displayTags }
        delete obj[tagId]
        setTags(obj)
        onTagDelete(tagId);
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
        if (type === 'Video/Audio') {
            const obj = { ...displayTags, [Object.keys(tags).length]: { tag: '', start: '00:00', end: '00:00' } };
            setTags(obj);
        } else {
            const obj = { ...displayTags, [Object.keys(tags).length]: { tag: '' } };
            setTags(obj);
        }
    }

    return (
        <fieldset className='main'>
            <legend className='label'>Tags</legend>
            <div className='tagsContainer'>
                {Object.entries(displayTags).map(item => {
                    const key = item[0];
                    const tag = item[1].tag;
                    const start = item[1].start;
                    const end = item[1].end;
                    return (
                        <div key={item[0]}
                            className={`tag 
                                    ${edit[key] && type === 'Video/Audio'
                                    ?
                                    'editTagExtended'
                                    :
                                    edit[key]
                                        ?
                                        'editInput'
                                        :
                                        ''
                                }`
                            }
                            onMouseEnter={() => onEnter(key)}
                            onMouseLeave={() => onLeave(key)}
                        >
                            {
                                edit[key]
                                    ?
                                    < div className='iconContainer right'>
                                        <FontAwesomeIcon className='icon' icon={faSave} size="1x" onClick={() => onSave()} />
                                    </div>
                                    :
                                    null
                            }
                            <input disabled={!edit[key]}
                                className={`tagInput 
                                    ${
                                    edit[key]
                                        ?
                                        'editInput'
                                        :
                                        ''
                                    }`
                                }
                                name={`tag${key}`}
                                type='text'
                                value={tag}
                                onChange={event => onChange(event, key)}
                            />
                            {
                                visible[key]
                                    ?
                                    <div className='iconContainer left'>
                                        {
                                            !edit[key]
                                                ?
                                                <FontAwesomeIcon className='icon' icon={faEdit}
                                                    size='1x' onClick={() => onEdit(key)} />

                                                :
                                                null
                                        }
                                        <FontAwesomeIcon className='icon' icon={faTrashAlt} size="1x" onClick={() => onDelete(key)} />
                                    </div>
                                    :
                                    null
                            }
                            {
                                edit[key] && type === 'Video/Audio'
                                    ?
                                    <div className='intervalContainer'>
                                        <input className='intervalInput'
                                            name={`start${key}`}
                                            type='text'
                                            value={start}
                                            onChange={event => onChange(event, key)}
                                        />
                                                /
                                                <input className='intervalInput'
                                            name={`end${key}`}
                                            type='text'
                                            value={end}
                                            onChange={event => onChange(event, key)}
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
    tags: PropTypes.array.isRequired,
    type: PropTypes.string.isRequired
}

export default EditableTags