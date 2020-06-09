import React from 'react';
import PropTypes from 'prop-types';
import { formId } from '../../config/config';
import FileList from './FileList';

import '../../styles/Files.css';

const Files = (props) => {
  const { files } = props;
  return (
    <div role="dialog" aria-labelledby="dialog-title">
      <h1 id="dialog-title" className="h1">Files</h1>
      <div className="new-link">
        <a
          rel="noopener noreferrer"
          target="_blank"
          href={`https://form.jotform.com/${formId}`}
        >
          New File
        </a>
      </div>
      <FileList files={files.entities} />
    </div>
  );
};

Files.propTypes = {
  files: PropTypes.shape({
    entities: PropTypes.shape({}).isRequired,
  }).isRequired,
};

export default Files;
