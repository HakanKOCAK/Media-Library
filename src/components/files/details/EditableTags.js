import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faSave, faEdit, faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types';

const EditableTags = (props) => {

    const { tags, type, onTagDelete, onTagAdd, onTagSave } = props;

    //To check if a tag is editing 
    const [edit, setEdit] = useState([]);

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

        const arr = [...tags]
        const { name, value } = event.currentTarget;

        if (name.includes('tag')) {
            arr[index].tag = value;
        } else if (name.includes('start')) {
            arr[index].start = value;
        } else {
            arr[index].end = value;
        }

        // setTags(arr);
    }

    const onDelete = (index) => {
        const arr = [...tags];
        arr.splice(index, 1);
        // setTags(arr);
        onTagDelete(index);
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
        const arr = [...tags, ''];
        // setTags(arr);
    }

    return (
        <fieldset className='main'>
            <legend className='label'>Tags</legend>
            <div className='tagsContainer'>
                {tags.map((item, index) => {
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
                                edit[index]
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
                                value={item.tag}
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
                                            value={item.start}
                                            onChange={event => onChange(event, index)}
                                        />
                                                /
                                                <input className='intervalInput'
                                            name={`end${index}`}
                                            type='text'
                                            value={item.end}
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
    tags: PropTypes.array.isRequired,
    type: PropTypes.string.isRequired
}

export default EditableTags