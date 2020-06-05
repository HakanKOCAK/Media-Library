import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { debounce } from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
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
import Spinner from '../spinner/Spinner';

const FileList = (props) => {
  const dispatch = useDispatch();
  const { files } = props;

  // const totalDisplayedEntries = 18;
  const increaseDecreaseBy = 6;
  const numberOfNewEntries = 12;
  const [limitAndOffset, setLimitAndOffset] = useState({
    offset: 0,
    limit: 6,
  });

  const [filesArray, setFilesArray] = useState([]);
  const [toDisplay, setToDisplay] = useState([]);

  useEffect(() => {
    setFilesArray(Object.values(files));
  }, [files]);

  useEffect(() => {
    setToDisplay(filesArray.slice(limitAndOffset.offset, limitAndOffset.limit));
  }, [filesArray, limitAndOffset]);

  const [isLoading, setLoading] = useState(false);
  const [noMore, setNoMore] = useState(false);
  const [scrollPosition, setScrollPosition] = useState({
    y: window.scrollY,
    direction: '',
  });

  const [filter, setFilter] = useState({
    active: {},
    sortBy: {},
  });

  const handleScroll = () => {
    setScrollPosition((prev) => ({
      y: window.scrollY,
      direction: prev.y > window.scrollY ? 'up' : 'down',
    }));
  };

  const loadMoreFiles = () => {
    if (limitAndOffset.limit >= filesArray.length) {
      dispatch(getAllFiles(filesArray.length, numberOfNewEntries)).then((response) => {
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
    // if (
    //   scrollPosition.direction === 'up'
    //   && limitAndOffset.limit > totalDisplayedEntries
    // ) {
    //   setLimitAndOffset((prev) => ({
    //     offset: prev.offset - increaseDecreaseBy,
    //     limit: prev.limit - increaseDecreaseBy,
    //   }));
    // }

    if (
      window.innerHeight
      + document.documentElement.scrollTop === document.documentElement.offsetHeight
      && !isLoading
    ) {
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

        if (!noMore) {
          setLoading(true);
        }
      }
    }
  }, [scrollPosition, isLoading]);

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

  const onReady = (submissionId, realDuration, prettifiedDuration) => {
    dispatch(addDuration({ submissionId, realDuration, prettifiedDuration }));
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

  const sortByProperty = (property, order) => {
    let sortOrder = 1;
    if (order === 'decrease') sortOrder = -1;
    return (a, b) => {
      const updatedSortBy = `real${property.slice(0, 1).toUpperCase()}${property.slice(1, property.length)}`;
      const updatedA = { ...a };
      const updatedB = { ...b };
      let val1;
      let val2;
      if (!updatedA.entity[updatedSortBy]) {
        val1 = 0;
      } else {
        val1 = updatedA.entity[updatedSortBy];
      }
      if (!updatedB.entity[updatedSortBy]) {
        val2 = 0;
      } else {
        val2 = updatedB.entity[updatedSortBy];
      }

      const getResult = () => {
        if (val1 < val2) return -1;
        if (val1 > val2) return 1;
        return 0;
      };

      const result = getResult();
      return result * sortOrder;
    };
  };

  const sortingFunction = (types, orders) => (obj1, obj2) => {
    let i = 0;
    let result = 0;
    const numberOfProperties = types.length;
    while (result === 0 && i < numberOfProperties) {
      result = sortByProperty(types[i], orders[i])(obj1, obj2);
      i += 1;
    }
    return result;
  };

  const onHeaderClick = (clickedHeader) => {
    const active = { ...filter.active };
    if (!active[clickedHeader]) active[clickedHeader] = true;

    const sortBy = { ...filter.sortBy };
    if (sortBy[clickedHeader] === 'increase') {
      sortBy[clickedHeader] = 'decrease';
    } else {
      sortBy[clickedHeader] = 'increase';
    }
    setToDisplay(toDisplay.sort(
      sortingFunction(Object.keys(sortBy), Object.values(sortBy)),
    ));
    setFilter((prev) => ({ ...prev, active, sortBy }));
  };

  const handleClick = (classList, submissionId) => {
    if (!classList.includes('toolbar')) {
      props.history.push(`/files/${submissionId}`);
    }
  };

  const notificationMessage = () => {
    if (isLoading) {
      return (
        <div style={{ textAlign: 'center' }}>
          <Spinner modified />
        </div>
      );
    }

    if (noMore) {
      return (
        <span
          style={{ fontSize: '10px', display: 'block', textAlign: 'center' }}
        >
          No more files
        </span>
      );
    }
    return (
      <span
        style={{ fontSize: '10px', display: 'block', textAlign: 'center' }}
      >
        Scroll down to load more
      </span>
    );
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
            <th
              className="clickable"
              onClick={() => onHeaderClick('size')}
            >
              File Size
              <FontAwesomeIcon
                style={{ opacity: `${filter.active.size && filter.sortBy.size === 'increase' ? '1' : '0'}` }}
                icon={faArrowDown}
                size="1x"
              />
              <FontAwesomeIcon
                style={{ opacity: `${filter.active.size && filter.sortBy.size === 'decrease' ? '1' : '0'}` }}
                icon={faArrowUp}
                size="1x"
              />
            </th>
            <th
              className="clickable"
              onClick={() => onHeaderClick('duration')}
            >
              Duration
              <FontAwesomeIcon
                style={{ opacity: `${filter.active.duration && filter.sortBy.duration === 'increase' ? '1' : '0'}` }}
                icon={faArrowDown}
                size="1x"
              />
              <FontAwesomeIcon
                style={{ opacity: `${filter.active.duration && filter.sortBy.duration === 'decrease' ? '1' : '0'}` }}
                icon={faArrowUp}
                size="1x"
              />
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {toDisplay.slice(limitAndOffset.offset, limitAndOffset.limit).map((item) => (
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
      {notificationMessage()}
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
