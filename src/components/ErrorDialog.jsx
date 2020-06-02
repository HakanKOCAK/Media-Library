import React from 'react';
import PropTypes from 'prop-types';

const ErrorDialog = (props) => {
  const { messages, onCloseDialog } = props;

  const onClose = () => {
    onCloseDialog();
  };

  return (
    <>
      {messages.map((message) => <span className="dialog-msg">{message}</span>)}
      <button type="button" className="btn btn-primary" onClick={onClose}>Close</button>
    </>
  );
};

ErrorDialog.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string])).isRequired,
  onCloseDialog: PropTypes.func.isRequired,
};

export default ErrorDialog;
