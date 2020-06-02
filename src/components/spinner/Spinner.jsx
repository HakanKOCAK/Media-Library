import React from 'react';
import PropTypes from 'prop-types';
import spinner from './spinner.gif';

const defaultContainerStyles = {
  height: '80vh',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  display: 'flex',
};

const inLineImageStyles = {
  width: '22px',
};

const defaultImageStyles = {
  width: '45px',
  margin: 'auto',
  display: 'block',
};

const Spinner = (props) => {
  const { modified } = props;

  const displaySpinner = () => {
    if (!modified) {
      return (
        <div style={defaultContainerStyles}>
          <img
            src={spinner}
            style={defaultImageStyles}
            alt="Loading..."
          />
        </div>
      );
    }
    return (
      <div>
        <img
          src={spinner}
          style={inLineImageStyles}
          alt="Loading..."
        />
      </div>
    );
  };

  return (
    displaySpinner()
  );
};

Spinner.propTypes = {
  modified: PropTypes.bool,
};

Spinner.defaultProps = {
  modified: false,
};

export default Spinner;
