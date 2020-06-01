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
import { formatCheckFromInput } from '../../../Utils/regExp';

const EditableTags = (props) => {
  const {
    tags,
    type,
    onTagDelete,
    onTagAdd,
    onTagSave,
    onTagChange,
    onTagClick,
    onDeleteNewTag,
  } = props;

  //  To check if a tag is editing
  const [edit, setEdit] = useState(Object.keys(tags).reduce((editables, key) => {
    const setReduced = { ...editables };
    setReduced[key] = false;
    return setReduced;
  }, {}));

  //  To display edit and delete options of tags
  const [visible, setVisible] = useState(Object.keys(tags).reduce((visibilites, key) => {
    const setReduced = { ...visibilites };
    setReduced[key] = false;
    return setReduced;
  }, {}));

  const config = {
    EMPTY_TAG: false,
    INTERVAL_FORMAT: false,
  };

  const [flags, setFlag] = useState(Object.keys(tags).reduce((newFlags, tagId) => {
    const reducedFlags = { ...newFlags };
    reducedFlags[tagId] = config;
    return reducedFlags;
  }, {}));

  const isTagValid = (tagId) => tags[tagId].tag !== '';

  const isStartIntervalValid = (tagId) => formatCheckFromInput(tags[tagId].start);

  const isEndIntervalValid = (tagId) => formatCheckFromInput(tags[tagId].end);

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
    const newVisibilites = { ...visible };
    newVisibilites[index] = true;
    setVisible(newVisibilites);
  };

  const onLeave = (index) => {
    if (!edit[index]) {
      const newVisibilites = { ...visible };
      newVisibilites[index] = false;
      setVisible(newVisibilites);
    }
  };

  const onCancel = (event, index) => {
    event.stopPropagation();
    if (!tags[index].new) {
      const newEditables = { ...edit };
      newEditables[index] = false;
      setEdit(newEditables);
    } else {
      onDeleteNewTag(index);
    }
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

  const onDelete = (name, tagId) => {
    onTagDelete(name, tagId);
  };

  const onSave = (event, tagId) => {
    event.stopPropagation();
    onTagSave(tagId);
    const newEditables = { ...edit };
    newEditables[tagId] = false;
    setEdit(newEditables);
  };

  const onEdit = (event, tagId) => {
    event.stopPropagation();
    const newEditables = { ...edit };
    newEditables[tagId] = true;
    setEdit(newEditables);
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
    const newVisibilites = { ...visible };
    newVisibilites[obj.tagId] = true;
    const newEditables = { ...edit };
    newEditables[obj.tagId] = true;
    const newFlags = { ...flags };
    newFlags[obj.tagId] = { EMPTY_TAG: true };
    setFlag(newFlags);
    setVisible(newVisibilites);
    setEdit(newEditables);
  };

  const getTagClasses = (tagId) => {
    let classes = '';
    if (type === 'Video/Audio') {
      classes += ' pointer';
      if (edit[tagId]) {
        classes += ' edit-tag-extended';
      }
    } else if (edit[tagId]) {
      classes += ' edit-input';
    }

    if (!isFormatsValid(tagId)) {
      classes += ' red-border';
    }

    return classes;
  };

  const getInputBoxClasses = (tagId) => {
    let classes = '';
    if (type === 'Video/Audio') {
      classes += ' pointer';
    }
    if (edit[tagId]) {
      classes += ' edit-input';
    }
    if (!isTagValid(tagId)) {
      classes += ' red-border';
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
      <div className="tags-container">
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
                role="button"
                tabIndex={0}
                className={`tag ${visible[tagId] ? getTagClasses(tagId) : ''}`}
                onMouseEnter={() => onEnter(tagId)}
                onMouseLeave={() => onLeave(tagId)}
                onKeyDown={() => { return type === 'Video/Audio' ? onSeekTo(start) : null; }}
                onClick={() => { return type === 'Video/Audio' ? onSeekTo(start) : null; }}
              >
                <div className="icon-container right">
                  {
                    (isNew || isEdited) && isFormatsValid(tagId)
                      ? <FontAwesomeIcon className="icon" icon={faSave} size="1x" onClick={(event) => onSave(event, tagId)} />
                      : null
                  }
                </div>

                <input
                  disabled={!edit[tagId]}
                  className={`tag-input ${visible[tagId] ? getInputBoxClasses(tagId) : ''}`}
                  name={`tag${tagId}`}
                  type="text"
                  value={tag}
                  onClick={(event) => { event.stopPropagation(); }}
                  onChange={(event) => onChange(event, tagId)}
                />
                <div className={`icon-container ${visible[tagId] ? 'left' : ''}`}>
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
                  {
                    !isNew ? (
                      <FontAwesomeIcon
                        style={visible[tagId] ? { opacity: '1' } : { opacity: '0' }}
                        className="icon"
                        icon={faTrashAlt}
                        size="1x"
                        onClick={(event) => { event.stopPropagation(); onDelete(tag, tagId); }}
                      />
                    )
                      : null
                  }
                </div>
                {
                  edit[tagId] && visible[tagId] && type === 'Video/Audio'
                    ? (
                      <div className="interval-container">
                        <input
                          className={`interval-input ${!isStartIntervalValid(tagId) ? 'red-border' : ''}`}
                          name={`start${tagId}`}
                          type="text"
                          value={start}
                          onClick={(event) => { event.stopPropagation(); }}
                          onChange={(event) => onChange(event, tagId)}
                        />
                        /
                        <input
                          className={`interval-input ${!isEndIntervalValid(tagId) ? 'red-border' : ''}`}
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
                {
                  flags[tagId] && visible[tagId]
                    ? <Error key={uuidv4()} flags={flags[tagId]} />
                    : null
                }
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
  onDeleteNewTag: PropTypes.func.isRequired,
};
export default EditableTags;
