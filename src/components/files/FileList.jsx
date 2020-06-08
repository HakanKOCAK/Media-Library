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

  // 0 = decrease , 1 = increase, 2 = no sort
  const [filter, setFilter] = useState({
    active: {},
    sortBy: {},
  });

  const [searchTag, setSearchTag] = useState('');

  useEffect(() => {
    if (searchTag) {
      const filteredElements = [];
      filesArray.slice(limitAndOffset.offset, limitAndOffset.limit).forEach((submission) => {
        let flag = false;
        if (
          submission.nameSurname.toLowerCase().includes(searchTag.toLowerCase())
          || submission.email.toLowerCase().includes(searchTag.toLowerCase())
        ) {
          filteredElements.push(submission);
          flag = true;
        }
        if (!flag) {
          const tags = Object.values(submission.entity.tags);
          tags.forEach((t) => {
            if (t.tag.toLowerCase().includes(searchTag.toLowerCase())) {
              filteredElements.push(submission);
            }
          });
        }
      });

      setToDisplay(filteredElements);
    } else {
      setToDisplay(filesArray.slice(limitAndOffset.offset, limitAndOffset.limit));
    }
  }, [searchTag, filesArray, limitAndOffset]);

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

  const onReady = (submissionId, duration, prettifiedDuration) => {
    dispatch(addDuration({ submissionId, duration, prettifiedDuration }));
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
      let sortedValA = a.entity[property];
      let sortedValB = b.entity[property];
      if (property === 'date') {
        sortedValA = a.uploadDate.split('').reverse().join('');
        sortedValB = b.uploadDate.split('').reverse().join('');
      }
      let val1;
      let val2;
      if (!sortedValA) {
        val1 = 0;
      } else {
        val1 = sortedValA;
      }
      if (!sortedValB) {
        val2 = 0;
      } else {
        val2 = sortedValB;
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

  const getArrowType = (type) => {
    const sortBy = { ...filter.sortBy };
    if (sortBy[type] === 'increase') {
      return (
        <FontAwesomeIcon
          icon={faArrowDown}
          size="1x"
        />
      );
    }

    if (sortBy[type] === 'decrease') {
      return (
        <FontAwesomeIcon
          icon={faArrowUp}
          size="1x"
        />
      );
    }

    return '-';
  };

  const onHeaderClick = (clickedHeader) => {
    const active = { ...filter.active };
    if (!active[clickedHeader]) active[clickedHeader] = true;

    const sortBy = { ...filter.sortBy };
    if (!sortBy[clickedHeader]) {
      sortBy[clickedHeader] = 'increase';
    } else if (sortBy[clickedHeader] === 'increase') {
      sortBy[clickedHeader] = 'decrease';
    } else {
      active[clickedHeader] = false;
      sortBy[clickedHeader] = '';
    }
    if (Object.values(active).filter((property) => property).length > 0) {
      const newSortBy = {};
      Object.entries(active).forEach(([key, value]) => {
        if (value) newSortBy[key] = sortBy[key];
      });
      setToDisplay(toDisplay.sort(
        sortingFunction(Object.keys(newSortBy), Object.values(newSortBy)),
      ));
    } else {
      setToDisplay(filesArray.slice(limitAndOffset.offset, limitAndOffset.limit));
    }

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
      <div style={{ textAlign: 'center', marginTop: '10px' }}>
        <input
          type="search"
          className="search-bar"
          value={searchTag}
          placeholder="Search (tag, name, email)"
          onChange={(event) => (setSearchTag(event.target.value))}
        />
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Name Surname</th>
            <th>E-mail</th>
            <th
              className="clickable"
              onClick={() => onHeaderClick('date')}
            >
              Upload Date
              {' '}
              {getArrowType('date')}
            </th>
            <th>File Name</th>
            <th>File Type</th>
            <th
              className="clickable"
              onClick={() => onHeaderClick('size')}
            >
              File Size
              {' '}
              {getArrowType('size')}
            </th>
            <th
              className="clickable"
              onClick={() => onHeaderClick('duration')}
            >
              Duration
              {' '}
              {getArrowType('duration')}
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
