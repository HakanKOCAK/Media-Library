import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTrashAlt,
  faSave,
  faEdit,
  faPlusCircle,
  faTimesCircle,
} from '@fortawesome/free-solid-svg-icons';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';
import Error from '../../Error';

const EditableTags = (props) => {
  const {
    tags,
    type,
    onTagDelete,
    onTagAdd,
    onTagSave,
    onTagChange,
    onTagClick,
  } = props;

  //  To check if a tag is editing
  const [edit, setEdit] = useState([]);

  //  To display edit and delete options of tags
  const [visible, setVisible] = useState([]);

  const config = {
    EMPTY_TAG: false,
    INTERVAL_FORMAT: false,
  };

  const [flags, setFlag] = useState(Object.entries(tags).reduce((newFlags, [tagId, value]) => {
    const reducedFlags = { ...newFlags };
    reducedFlags[tagId] = config;
    return reducedFlags;
  }, {}));

  const isTagValid = (tagId) => tags[tagId].tag !== '';

  const isStartIntervalValid = (tagId) => /^((?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d)$/.test(tags[tagId].start);

  const isEndIntervalValid = (tagId) => /^((?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d)$/.test(tags[tagId].end);

  const isFormatsValid = (tagId) => {
    if (tags[tagId].start && tags[tagId].end) {
      return isTagValid(tagId) && isStartIntervalValid(tagId) && isEndIntervalValid(tagId);
    }

    return tags[tagId].tag !== '';
  };

  const onSeekTo = (time) => {
    onTagClick(time);
  };

  const onEnter = (index) => {
    const arr = [];
    arr[index] = true;
    setVisible(arr);
  };

  const onLeave = (index) => {
    const arr = [...edit];
    arr[index] = false;
    setVisible(arr);
  };

  const onCancel = (event, index) => {
    event.stopPropagation();
    const arr = [...edit];
    arr[index] = false;
    setEdit(arr);
  };

  const onChange = (event, tagId) => {
    const { name, value } = event.target;
    if (name.includes('tag')) {
      onTagChange('tag', tagId, value);
      if (value === '') {
        setFlag({ ...flags, [tagId]: { ...flags[tagId], EMPTY_TAG: true } });
      } else {
        setFlag({ ...flags, [tagId]: { ...flags[tagId], EMPTY_TAG: false } });
      }
    } else if (name.includes('start')) {
      onTagChange('start', tagId, value);
      if (!/^((?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d)$/.test(value)) {
        setFlag({ ...flags, [tagId]: { ...flags[tagId], INTERVAL_FORMAT: true } });
      } else {
        setFlag({ ...flags, [tagId]: { ...flags[tagId], INTERVAL_FORMAT: false } });
      }
    } else {
      onTagChange('end', tagId, value);
      if (!/^((?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d)$/.test(value)) {
        setFlag({ ...flags, [tagId]: { ...flags[tagId], INTERVAL_FORMAT: true } });
      } else {
        setFlag({ ...flags, [tagId]: { ...flags[tagId], INTERVAL_FORMAT: false } });
      }
    }
  };

  const onDelete = (tagId, isNew) => {
    onTagDelete(tagId, isNew);
  };

  const onSave = (event, tagId) => {
    event.stopPropagation();
    onTagSave(tagId);
    const arr = [];
    arr[tagId] = false;
    setEdit(arr);
  };

  const onEdit = (event, tagId) => {
    event.stopPropagation();
    const arr = [...edit];
    arr[tagId] = true;
    setEdit(arr);
  };

  const onAdd = () => {
    let obj = {};
    if (type === 'Video/Audio') {
      obj = {
        tagId: uuidv4(),
        tag: {
          tag: '',
          start: '00:00:00',
          end: '00:00:00',
          new: true,
        },
      };
    } else {
      obj = {
        tagId: uuidv4(),
        tag: {
          tag: '',
          new: true,
        },
      };
    }
    onTagAdd(obj);
  };

  const getTagClasses = (tagId) => {
    let classes = 'tag';
    if (type === 'Video/Audio') {
      classes += ' pointer';
      if (edit[tagId]) {
        classes += ' editTagExtended';
      }
    } else if (edit[tagId]) {
      classes += ' editInput';
    }

    if (!isFormatsValid(tagId)) {
      classes += ' redBorder';
    }

    return classes;
  };

  const getInputBoxClasses = (tagId) => {
    let classes = 'tagInput';
    if (type === 'Video/Audio') {
      classes += ' pointer';
    }
    if (edit[tagId]) {
      classes += ' editInput';
    }
    if (!isTagValid(tagId)) {
      classes += ' redBorder';
    }

    return classes;
  };

  const isNewTagExist = () => {
    const isNewExists = Object.values(tags).map((tag) => {
      if (tag.new) {
        return true;
      }
      return false;
    });

    return isNewExists.includes(true);
  };

  return (
    <fieldset className="main">
      <legend className="label">Tags</legend>
      <div className="tagsContainer">
        {Object.entries(tags).map((item) => {
          const tagId = item[0];
          const {
            tag,
            start,
            end,
            new: isNew,
            edited: isEdited,
          } = item[1];

          return (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div
                key={tagId}
                className={getTagClasses(tagId)}
                onMouseEnter={() => onEnter(tagId)}
                onMouseLeave={() => onLeave(tagId)}
                onClick={() => type === 'Video/Audio' ? onSeekTo(start) : () => { return; }}
              >
                <div className="iconContainer right">
                  {
                    (isNew || isEdited) && isFormatsValid(tagId)
                      ? <FontAwesomeIcon className="icon" icon={faSave} size="1x" onClick={(event) => onSave(event, tagId)} />
                      : null
                  }
                </div>

                <input
                  disabled={!edit[tagId]}
                  className={getInputBoxClasses(tagId)}
                  name={`tag${tagId}`}
                  type="text"
                  value={tag}
                  onClick={(event) => { event.stopPropagation(); }}
                  onChange={(event) => onChange(event, tagId)}
                />
                <div className={`iconContainer ${visible[tagId] ? 'left' : ''}`}>
                  {
                    !edit[tagId]
                      ? (
                        <FontAwesomeIcon
                          style={visible[tagId] ? { opacity: '1' } : { opacity: '0' }}
                          className="icon"
                          icon={faEdit}
                          size="1x"
                          onClick={(event) => onEdit(event, tagId)}
                        />
                      )
                      : null
                  }
                  {
                    edit[tagId]
                      ? (
                        <FontAwesomeIcon
                          style={visible[tagId] ? { opacity: '1' } : { opacity: '0' }}
                          className="icon"
                          icon={faTimesCircle}
                          size="1x"
                          onClick={(event) => { onCancel(event, tagId); }}
                        />
                      )
                      : null
                  }
                  <FontAwesomeIcon
                    style={visible[tagId] ? { opacity: '1' } : { opacity: '0' }}
                    className="icon"
                    icon={faTrashAlt}
                    size="1x"
                    onClick={(event) => { event.stopPropagation(); if (window.confirm('Delete the tag?')) { onDelete(tagId, isNew); } }}
                  />
                </div>
                {
                  edit[tagId] && type === 'Video/Audio'
                    ? (
                      <div className="intervalContainer">
                        <input
                          className={`intervalInput ${!isStartIntervalValid(tagId) ? 'redBorder' : ''}`}
                          name={`start${tagId}`}
                          type="text"
                          value={start}
                          onClick={(event) => { event.stopPropagation(); }}
                          onChange={(event) => onChange(event, tagId)}
                        />
                        /
                        <input
                          className={`intervalInput ${!isEndIntervalValid(tagId) ? 'redBorder' : ''}`}
                          name={`end${tagId}`}
                          type="text"
                          value={end}
                          onClick={(event) => { event.stopPropagation(); }}
                          onChange={(event) => onChange(event, tagId)}
                        />
                      </div>
                    )
                    : null
                }
              </div>
              <div style={{ margin: '0px auto', maxWidth: '210px' }}>
                {flags[tagId] ? <Error key={uuidv4()} flags={flags[tagId]} /> : null}
              </div>
            </div>
          );
        })}
        {
          !isNewTagExist() ? (
            <div style={{ width: '210px', display: 'flex', justifyContent: 'center' }}>
              <FontAwesomeIcon
                style={{ marginTop: '5px' }}
                icon={faPlusCircle}
                size="lg"
                onClick={() => onAdd()}
              />
            </div>
          )
            : null
        }
      </div>
    </fieldset>
  );
};
EditableTags.propTypes = {
  tags: PropTypes.shape({}).isRequired,
  type: PropTypes.string.isRequired,
  onTagAdd: PropTypes.func.isRequired,
  onTagSave: PropTypes.func.isRequired,
  onTagDelete: PropTypes.func.isRequired,
  onTagChange: PropTypes.func.isRequired,
  onTagClick: PropTypes.func.isRequired,
};
export default EditableTags;
