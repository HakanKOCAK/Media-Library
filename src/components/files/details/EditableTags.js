import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faSave, faEdit, faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';

const EditableTags = (props) => {

    const { tags, type, onTagDelete, onTagAdd, onTagSave, onTagChange } = props;

    //To check if a tag is editing 
    const [edit, setEdit] = useState([]);

    //To display edit and delete options of tags
    const [visible, setVisible] = useState([]);


    const isTagCorrect = (tagId) => {
        console.log('isTag', tags[tagId].tag !== '')
        return tags[tagId].tag !== ''
    }

    const isStartCorrect = (tagId) => {
        return /^((?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d)$/.test(tags[tagId].start)
    }

    const isEndCorrect = (tagId) => {
        return /^((?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d)$/.test(tags[tagId].end)
    }
    const isFormatsCorrect = (tagId) => {
        if (tags[tagId].start && tags[tagId].end) {
            return isTagCorrect(tagId) && isStartCorrect(tagId) && isEndCorrect(tagId)
        }

        return tags[tagId].tag !== '';
    }

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

    const onChange = (event, tagId) => {

        const { name, value } = event.currentTarget;
        if (name.includes('tag')) {
            onTagChange('tag', tagId, value)
        } else if (name.includes('start')) {
            onTagChange('start', tagId, value)
        } else {
            onTagChange('end', tagId, value)
        }
    }

    const onDelete = (tagId, isNew) => {
        onTagDelete(tagId, isNew);
    }

    const onSave = (tagId) => {
        onTagSave(tagId)
        const arr = []
        arr[tagId] = false
        setEdit(arr)
    }

    const onEdit = (tagId) => {
        const arr = [...edit];
        arr[tagId] = true;
        setEdit(arr);
    }

    const onAdd = () => {
        let obj = {}
        if (type === 'Video/Audio') {
            obj = { tagId: uuidv4(), tag: { tag: '', start: '00:00:00', end: '00:00:00', new: true } };
        } else {
            obj = { tagId: uuidv4(), tag: { tag: '', new: true } };
        }
        onTagAdd(obj)
    }

    return (
        <fieldset className='main'>
            <legend className='label'>Tags</legend>
            <div className='tagsContainer'>
                {Object.entries(tags).map(item => {
                    const tagId = item[0];
                    const tag = item[1].tag;
                    const start = item[1].start;
                    const isNew = item[1].new;
                    const isEdited = item[1].edited;
                    const end = item[1].end;
                    return (
                        <div key={item[0]}
                            className={`tag 
                                    ${edit[tagId] && type === 'Video/Audio'
                                    ?
                                    'editTagExtended'
                                    :
                                    edit[tagId]
                                        ?
                                        'editInput'
                                        :
                                        ''
                                }
                                ${!isFormatsCorrect(tagId) ? 'redBorder' : ''}`
                            }
                            onMouseEnter={() => onEnter(tagId)}
                            onMouseLeave={() => onLeave(tagId)}
                        >
                            {
                                (isNew || isEdited) && isFormatsCorrect(tagId)
                                    ?
                                    < div className='iconContainer right'>
                                        <FontAwesomeIcon className='icon' icon={faSave} size="1x" onClick={() => onSave(tagId)} />
                                    </div>
                                    :
                                    null
                            }
                            <input disabled={!edit[tagId]}
                                className={`tagInput 
                                    ${
                                    edit[tagId]
                                        ?
                                        'editInput'
                                        :
                                        ''
                                    }
                                    ${!isTagCorrect(tagId) ? 'redBorder' : ''}`
                                }
                                name={`tag${tagId}`}
                                type='text'
                                value={tag}
                                onChange={event => onChange(event, tagId)}
                            />
                            {
                                visible[tagId]
                                    ?
                                    <div className='iconContainer left'>
                                        {
                                            !edit[tagId]
                                                ?
                                                <FontAwesomeIcon className='icon' icon={faEdit}
                                                    size='1x' onClick={() => onEdit(tagId)} />

                                                :
                                                null
                                        }
                                        <FontAwesomeIcon className='icon' icon={faTrashAlt} size="1x" onClick={() => { if (window.confirm('Delete the tag?')) { onDelete(tagId, isNew) } }} />
                                    </div>
                                    :
                                    null
                            }
                            {
                                edit[tagId] && type === 'Video/Audio'
                                    ?
                                    <div className='intervalContainer'>
                                        <input className={`intervalInput ${!isStartCorrect(tagId) ? 'redBorder' : ''}`}
                                            name={`start${tagId}`}
                                            type='text'
                                            value={start}
                                            onChange={event => onChange(event, tagId)}
                                        />
                                                /
                                        <input className={`intervalInput ${!isEndCorrect(tagId) ? 'redBorder' : ''}`}
                                            name={`end${tagId}`}
                                            type='text'
                                            value={end}
                                            onChange={event => onChange(event, tagId)}
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
    tags: PropTypes.shape({}).isRequired,
    type: PropTypes.string.isRequired,
    onTagAdd: PropTypes.func.isRequired,
    onTagSave: PropTypes.func.isRequired,
    onTagDelete: PropTypes.func.isRequired,
    onTagChange: PropTypes.func.isRequired
}

EditableTags.defaultProps = {
    tags: {},
    type: '',
    onTagAdd: () => { },
    onTagSave: () => { },
    onTagDelete: () => { },
    onTagChange: () => { }
}

export default EditableTags