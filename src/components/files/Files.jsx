import React from 'react';
import PropTypes from 'prop-types';
import { formId } from '../../config/config';
import FileList from './FileList';

import '../../styles/Files.css';

const Files = (props) => {
  const { files } = props;
  return (
    <>
      <h1 className="h1">Files</h1>
      <a
        rel="noopener noreferrer"
        target="_blank"
        href={`https://form.jotform.com/${formId}`}
        className="new-link"
      >
        New File
      </a>
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
