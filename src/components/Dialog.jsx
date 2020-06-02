import React from 'react';
import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { HIDE_DIALOG, SET_DIALOG } from '../actions/types';
import ErrorDialog from './ErrorDialog';
import DeleteDialog from './DeleteDialog';
import Auth from './Auth';
import submitLogin from '../actions/login';

import '../styles/Dialog.css';

const Dialog = (props) => {
  const dispatch = useDispatch();

  const { dialog } = props;
  const { type, data, isOpen } = dialog;

  const onConfirmDelete = (password) => {
    if (!data.isAuthRequired) {
      dispatch(data.func);
      dispatch({
        type: HIDE_DIALOG,
      });
    } else if (type !== 'authentication') {
      dispatch({
        type: SET_DIALOG,
        payload: { type: 'authentication', data: { func: data.func, isAuthRequired: true } },
      });
    } else {
      dispatch(submitLogin(props.user.email, password, true)).then((resp) => {
        if (resp.success) {
          dispatch(data.func);
          dispatch({
            type: HIDE_DIALOG,
          });
        } else {
          const errors = [];
          errors.push(resp.error.message);
          dispatch({
            type: SET_DIALOG,
            payload: { type: 'error', data: { errors } },
          });
        }
      });
    }
  };

  const onCloseDialog = () => {
    dispatch({
      type: HIDE_DIALOG,
    });
  };

  const displayDialog = () => {
    switch (type) {
      case 'error':
        return (
          <ErrorDialog
            messages={data.errors}
            onCloseDialog={onCloseDialog}
          />
        );
      case 'delete':
        return (
          <DeleteDialog
            data={{ type: data.type, name: data.name }}
            onCloseDialog={onCloseDialog}
            onConfirmDelete={onConfirmDelete}
          />
        );
      case 'authentication':
        return (
          <Auth
            onCloseDialog={onCloseDialog}
            onConfirmDelete={onConfirmDelete}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="dialog-container">
      {
        isOpen && type && (
          <div className="dialog-notification">
            <span>{type.toUpperCase()}</span>
            {displayDialog()}
          </div>
        )
      }
    </div>
  );
};

Dialog.propTypes = {
  dialog: PropTypes.shape({
    type: PropTypes.string.isRequired,
    isOpen: PropTypes.bool.isRequired,
    data: PropTypes.shape({
      errors: PropTypes.array,
      isAuthRequired: PropTypes.bool,
      type: PropTypes.string,
      name: PropTypes.string,
      func: PropTypes.func,
    }).isRequired,
  }).isRequired,
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  dialog: state.dialog,
  user: state.user,
});

export default connect(mapStateToProps)(Dialog);
