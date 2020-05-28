import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import errorMessages from '../Utils/errors';

const Error = (props) => {
  const { flags } = props;

  return (
    <div className="error-div">
      {
        Object.keys(flags).map((key) => {
          const val = flags[key];
          if (val) {
            return <p key={uuidv4()} className="my-02">{errorMessages[key]}</p>;
          }
          return null;
        })
      }
    </div>
  );
};

Error.propTypes = {
  flags: PropTypes.shape({}).isRequired,
};

export default Error;
