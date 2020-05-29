import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Spinner from '../spinner/Spinner';
import Video from './details/Video';
import Image from './details/Image';
import Other from './details/Other';
import EditableTags from './details/EditableTags';
import { deleteTag } from '../../actions/files';
import updateTag from '../../apis/updateTag';
import { setError } from '../../actions/error';
import { SAVE_TAG_REQUEST, SAVE_TAG_ERROR, SAVE_TAG_SUCCESS, DELETE_TAG_SUCCESS, DELETE_TAG_ERROR } from '../../actions/types';

import '../../styles/FileDetails.css';

const FileDetails = (props) => {
  const dispatch = useDispatch();
  const { match } = props;
  const { params } = match;
  const { id } = params;

  const { files } = props;
  const file = files.entities[id];

  //  Upload date
  const { uploadDate } = file;

  // Entity details
  const { entity } = file;

  //  Qid for the tags to be updated later

  const { qid: tagsQid } = entity;

  //  Submitter name
  const { nameSurname: name } = file;

  //  File Type
  const { fileType: type } = file;

  //  Set submitted tags
  const [tags, setTags] = useState(entity.tags);

  const { url } = entity;

  //  seek the player to given seconds
  const [seekTo, setSeekTo] = useState();

  const onTagClick = (time) => {
    setSeekTo(time);
  };

  const onDelete = async (tagId, isNew) => {
    if (!isNew) {
      dispatch(deleteTag({ submissionId: id, tagId }));
      const newTags = props.files.entities[id].entity.tags;
      const response = await updateTag({ submissionId: id, qid: tagsQid, data: newTags });
      if (!response.success) {
        dispatch({
          type: DELETE_TAG_ERROR,
        });
        dispatch(setError(response.error));
      } else {
        dispatch({
          type: DELETE_TAG_SUCCESS,
        });
      }
    } else {
      const newTags = {};
      Object.entries(tags).forEach(([key, value]) => {
        if (key !== tagId) {
          newTags[key] = value;
        }
      });
      setTags(newTags);
    }
  };

  const onSave = async (tagId) => {
    dispatch({
      type: SAVE_TAG_REQUEST,
      payload: { submissionId: id, tagId, tag: tags[tagId] },
    });
    const newTags = props.files.entities[id].entity.tags;
    const response = await updateTag({ submissionId: id, qid: tagsQid, data: newTags });

    if (!response.success) {
      dispatch({
        type: SAVE_TAG_ERROR,
      });
      if (response.types.length !== 0) {
        dispatch(setError(response.error, response.types));
      } else {
        dispatch(setError(response.error));
      }
    } else {
      dispatch({
        type: SAVE_TAG_SUCCESS,
      });
    }
  };

  const onChange = (inputType, tagId, value) => {
    const newTags = { ...tags };
    newTags[tagId].edited = true;
    if (inputType === 'tag') {
      newTags[tagId].tag = value;
    } else if (inputType === 'start') {
      newTags[tagId].start = value;
    } else {
      newTags[tagId].end = value;
    }

    setTags(newTags);
  };

  const onAdd = (data) => {
    const newTags = { ...tags };
    newTags[data.tagId] = data.tag;
    setTags(newTags);
  };

  const displayFile = () => {
    switch (type) {
      case 'Video/Audio':
        return <Video url={url} seekTo={seekTo} />;
      case 'Image':
        return <Image url={url} />;
      default:
        return <Other url={url} />;
    }
  };

  useEffect(() => {
    setTags(files.entities[id].entity.tags);
  }, [files]);

  if (!file) {
    return <Spinner />;
  }

  return (
    <>
      <Link to="/files" className="link">
        <FontAwesomeIcon icon={faLongArrowAltLeft} size="lg" />
        <span className="mx-05">Back to Files</span>
      </Link>
      <h1 className="h1">Details</h1>
      <p className="p1">
        Submitted by
        {name}
        at
        {uploadDate}
      </p>
      {displayFile()}
      <EditableTags
        tags={tags}
        onTagDelete={onDelete}
        onTagAdd={onAdd}
        onTagChange={onChange}
        onTagSave={onSave}
        onTagClick={onTagClick}
        type={type}
      />
    </>
  );
};

FileDetails.propTypes = {
  files: PropTypes.shape({
    entities: PropTypes.shape({}).isRequired,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default FileDetails;
