import React from 'react';
import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { CLOSE_DIALOG } from '../actions/types';

import '../styles/Dialog.css';

const DeleteDialog = (props) => {
  const dispatch = useDispatch();

  const { deleteDialog } = props;
  const { data, isOpen } = deleteDialog;

  const onConfirm = () => {
    dispatch({
      type: CLOSE_DIALOG,
    });
  };

  const onClose = () => {
    dispatch({
      type: CLOSE_DIALOG,
    });
  };

  return (
    <div className="dialog-container">
      {
        isOpen && data && (
          <div className="dialog-notification">
            <span className="dialog-msg">{`Are you sure delete the ${data.type} ${data.name}`}</span>
            <div className="button-div">
              <button type="button" className="btn btn-light" onClick={onClose}>No</button>
              <button type="button" className="btn btn-primary" onClick={onConfirm}>Yes</button>
            </div>
          </div>
        )
      }
    </div>
  );
};

DeleteDialog.propTypes = {
  deleteDialog: PropTypes.shape({
    data: PropTypes.shape({
      type: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
    isOpen: PropTypes.bool.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({ deleteDialog: state.deleteDialog });

export default connect(mapStateToProps)(DeleteDialog);
