import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

const ErrorDialog = (props) => {
  const { messages, onCloseDialog } = props;

  const onClose = () => {
    onCloseDialog();
  };

  const buttonRef = useRef(null);

  useEffect(() => {
    buttonRef.current.focus();
  }, []);

  return (
    <>
      {messages.map((message) => <span className="dialog-msg">{message}</span>)}
      <button ref={buttonRef} type="button" className="btn btn-primary" onClick={onClose}>Close</button>
    </>
  );
};

ErrorDialog.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string])).isRequired,
  onCloseDialog: PropTypes.func.isRequired,
};

export default ErrorDialog;
