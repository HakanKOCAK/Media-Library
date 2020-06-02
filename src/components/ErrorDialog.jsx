import React from 'react';
import PropTypes from 'prop-types';

const ErrorDialog = (props) => {
  const { messages, onReload } = props;

  const onReloadClick = () => {
    onReload();
  };

  return (
    <>
      {messages.map((message) => <span className="dialog-msg">{message}</span>)}
      <button type="button" className="btn btn-primary" onClick={onReloadClick}>Reload</button>
    </>
  );
};

ErrorDialog.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string])).isRequired,
  onReload: PropTypes.func.isRequired,
};

export default ErrorDialog;
