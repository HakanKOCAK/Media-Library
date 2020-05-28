import React from 'react';
import PropTypes from 'prop-types';
import FileList from './FileList';

import '../../styles/Files.css';

const Files = (props) => {
  const { files } = props;
  return (
    <>
      <h1 className="h1">Files</h1>
      <FileList files={files.entities} />
    </>
  );
};

Files.propTypes = {
  files: PropTypes.shape({
    entities: PropTypes.shape({}).isRequired,
  }).isRequired,
};

export default Files;
