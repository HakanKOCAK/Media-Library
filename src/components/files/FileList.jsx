import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { formId } from '../../config/config';
import { deleteFile, getAllFiles, addDuration, addSize } from '../../actions/files';
import { setDialog } from '../../actions/dialog';
import ListItem from './ListItem';

import '../../styles/Files.css';

const FileList = (props) => {
  const dispatch = useDispatch();
  const { files } = props;
  const filesArray = Object.values(files);

  const [isLoading, setLoading] = useState(false);
  const handleScroll = () => {
    if (
      window.innerHeight
      + document.documentElement.scrollTop !== document.documentElement.offsetHeight
    ) return;
    setLoading(true);
  };

  const loadMoreFiles = () => {
    setLoading(true);
    dispatch(getAllFiles(filesArray.length, 10)).then((response) => {
      if (response.success) setLoading(false);
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isLoading) return;
    loadMoreFiles();
  }, [isLoading]);

  const onReady = (submissionId, duration) => {
    dispatch(addDuration({ submissionId, duration }));
  };

  const addFileSize = (submissionId, url) => {
    dispatch(addSize(submissionId, url));
  };

  const onEdit = (submissionId) => {
    window.open(`https://jotform.com/edit/${submissionId}`, '_blank');
  };

  const onDelete = (submissionId, fileName) => {
    dispatch(setDialog('delete', {
      type: 'file',
      name: fileName,
      func: deleteFile(submissionId),
      isAuthRequired: true,
    }));
  };

  const handleClick = (classList, submissionId) => {
    if (!classList.includes('toolbar')) {
      props.history.push(`/files/${submissionId}`);
    }
  };

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th>Name Surname</th>
            <th>E-mail</th>
            <th>Upload Date</th>
            <th>File Name</th>
            <th>File Type</th>
            <th>File Size</th>
            <th>Duration</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filesArray.map((item) => (
            <ListItem
              key={item.submissionId}
              handleClick={handleClick}
              onEdit={onEdit}
              onDelete={onDelete}
              onReady={onReady}
              addSize={addFileSize}
              file={item}
            />
          ))}
        </tbody>
      </table>
      <a
        rel="noopener noreferrer"
        target="_blank"
        href={`https://form.jotform.com/${formId}`}
        className="new-link"
      >
        New File
      </a>
    </>
  );
};

FileList.propTypes = {
  files: PropTypes.shape({}).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(FileList);
