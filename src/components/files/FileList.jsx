import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { debounce } from 'lodash';
import PropTypes from 'prop-types';
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

  const totalDisplayedEntries = 18;
  const increaseDecreaseBy = 6;
  const numberOfNewEntries = 12;
  const [limitAndOffset, setLimitAndOffset] = useState({
    offset: 0,
    limit: 6,
  });
  const filesArray = Object.values(files);
  const [isLoading, setLoading] = useState(false);
  const [noMore, setNoMore] = useState(false);
  const [scrollPosition, setScrollPosition] = useState({
    y: window.scrollY,
    direction: '',
  });

  const handleScroll = () => {
    setScrollPosition((prev) => ({
      y: window.scrollY,
      direction: prev.y > window.scrollY ? 'up' : 'down',
    }));
  };

  const loadMoreFiles = () => {
    if (limitAndOffset.limit > filesArray.length && !noMore) {
      dispatch(getAllFiles(filesArray.length, numberOfNewEntries)).then((response) => {
        if (response.success) {
          setLoading(false);
          setNoMore(response.noMore);
        }
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    // Scrolled to top of the page
    // if (
    //   scrollPosition.direction === 'up'
    //   && limitAndOffset.limit > totalDisplayedEntries
    // ) {
    //   setLimitAndOffset((prev) => ({
    //     offset: prev.offset - increaseDecreaseBy,
    //     limit: prev.limit - increaseDecreaseBy,
    //   }));
    // } else

    if (
      window.innerHeight
      + document.documentElement.scrollTop === document.documentElement.offsetHeight
    ) {
      if (!noMore) {
        setLoading(true);
      }
      if (limitAndOffset.limit <= filesArray.length) {
        // const updatedOffset = () => {
        //   if (limitAndOffset.limit / totalDisplayedEntries >= 1) {
        //     return limitAndOffset.offset + increaseDecreaseBy;
        //   }
        //   return limitAndOffset.offset;
        // };

        setLimitAndOffset((prev) => ({
          limit: prev.limit + increaseDecreaseBy,
        }));
      }
    }
  }, [scrollPosition]);

  useLayoutEffect(() => {
    const debounceWrapper = debounce(handleScroll, 300);
    window.addEventListener('scroll', debounceWrapper);

    return () => {
      window.removeEventListener('scroll', debounceWrapper);
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
          {filesArray.slice(limitAndOffset.offset, limitAndOffset.limit).map((item) => (
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
