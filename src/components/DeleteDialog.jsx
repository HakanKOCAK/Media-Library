import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

const DeleteDialog = (props) => {
  const { data, onConfirmDelete, onCloseDialog } = props;

  const onConfirm = () => {
    onConfirmDelete();
  };

  const onClose = () => {
    onCloseDialog();
  };

  const buttonRef = useRef(null);
  useEffect(() => {
    buttonRef.current.focus();
  }, []);

  return (
    <>
      <span
        id="dialog-description"
        className="dialog-msg"
      >
        {`Are you sure delete the ${data.type} ${data.name}`}
      </span>
      <div className="button-div">
        <button ref={buttonRef} type="button" className="btn btn-light" onClick={onClose}>No</button>
        <button type="button" className="btn btn-primary" onClick={onConfirm}>Yes</button>
      </div>
    </>
  );
};

DeleteDialog.propTypes = {
  data: PropTypes.shape({
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  onConfirmDelete: PropTypes.func.isRequired,
  onCloseDialog: PropTypes.func.isRequired,
};

export default DeleteDialog;
