import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactPlayer from 'react-player';
import { faTrashAlt, faEdit, faSearch } from '@fortawesome/free-solid-svg-icons';
import prettyMilliseconds from 'pretty-ms';
import Spinner from '../spinner/Spinner';

const ListItem = (props) => {
  const { file } = props;

  const {
    submissionId,
    nameSurname,
    email,
    uploadDate,
    fileType,
    entity,
  } = file;

  const {
    fileName,
    prettifiedSize: size,
    prettifiedDuration: duration,
  } = entity;

  const addSize = () => {
    props.addSize(submissionId, entity.url);
  };

  const handleClick = (event) => {
    props.handleClick(Array.from(event.target.classList), submissionId);
  };

  const onDelete = () => {
    props.onDelete(submissionId, fileName);
  };

  const onEdit = (event) => {
    event.stopPropagation();
    props.onEdit(submissionId);
  };

  const onReady = (playerDuration) => {
    if (!duration) {
      props.onReady(submissionId, playerDuration, prettyMilliseconds(playerDuration * 1000));
    }
  };

  const getDurationValue = () => {
    if (fileType === 'Video/Audio') {
      if (duration) {
        return duration;
      }
      return <Spinner modified />;
    }

    return 'N/A';
  };

  const getSizeValue = () => {
    if (size) {
      return size;
    }
    return <Spinner modified />;
  };

  useEffect(() => {
    if (!size) {
      addSize();
    }
  }, []);

  return (
    <tr id={submissionId} onClick={(event) => handleClick(event)}>
      <td>
        {nameSurname}
      </td>
      <td>
        {email}
      </td>
      <td>
        {uploadDate}
      </td>
      <td>
        {fileName}
      </td>
      <td>
        {fileType}
      </td>
      <td>
        {getSizeValue()}
      </td>
      <td>
        {getDurationValue()}
        {
          fileType === 'Video/Audio'
            ? <ReactPlayer style={{ display: 'none' }} url={file.entity.url} onReady={(state) => onReady(state.getDuration())} />
            : null
        }

      </td>
      <td className="toolbar">
        <button type="button" className="icon" onClick={(event) => handleClick(event)}>
          Details
          <FontAwesomeIcon icon={faSearch} size="1x" />
        </button>
        <button type="button" className="icon" onClick={(event) => onEdit(event)}>
          Edit
          <FontAwesomeIcon icon={faEdit} size="1x" />
        </button>
        <button type="button" className="icon" onClick={(event) => { event.stopPropagation(); onDelete(); }}>
          Delete
          <FontAwesomeIcon icon={faTrashAlt} size="1x" />
        </button>
      </td>
    </tr>
  );
};

ListItem.propTypes = {
  file: PropTypes.shape({
    submissionId: PropTypes.string.isRequired,
    nameSurname: PropTypes.string.isRequired,
    uploadDate: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    entity: PropTypes.shape({
      fileName: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      prettifiedSize: PropTypes.string,
      prettifiedDuration: PropTypes.string,
    }).isRequired,
    fileType: PropTypes.string.isRequired,
  }).isRequired,
  handleClick: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onReady: PropTypes.func.isRequired,
  addSize: PropTypes.func.isRequired,
};

export default ListItem;
