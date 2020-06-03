import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { formId } from '../../config/config';
import {
  deleteFile,
  getAllFiles,
  addDuration,
  addSize,
} from '../../actions/files';
import { setDialog } from '../../actions/dialog';
import ListItem from './ListItem';

import '../../styles/Files.css';

const FileList = (props) => {
  const dispatch = useDispatch();
  const { files } = props;
  const [offset, setOffSet] = useState(0);
  const [limit, setLimit] = useState(6);

  const filesArray = Object.values(files);
  const toDisplay = filesArray.slice(offset, limit);
  const [isLoading, setLoading] = useState(false);
  const [noMore, setNoMore] = useState(false);
  const [scrollPosition, setScrollPosition] = useState();

  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  const loadMoreFiles = () => {
    if (limit > filesArray.length) {
      dispatch(getAllFiles(filesArray.length, 12)).then((response) => {
        if (response.success) {
          setLoading(false);
          setNoMore(response.noMore);
        }
      });
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Scrolled to top of the page
    if (window.scrollY === 0) {
      if (offset > 0 && limit > 18) {
        setOffSet(offset - 6);
        setLimit(limit - 6);
      }
    }
    // Scrolled to bottom of the page
    if (
      window.innerHeight
      + document.documentElement.scrollTop === document.documentElement.offsetHeight
    ) {
      if (limit <= filesArray.length) {
        if (limit / 18 >= 1) {
          setOffSet(offset + 6);
        }
        setLimit(limit + 6);
      }
      if (!noMore) {
        setLoading(true);
      }
    }
  }, [scrollPosition]);

  useLayoutEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
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
          {toDisplay.map((item) => (
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
