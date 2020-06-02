import React from 'react';
import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { HIDE_NOTIFICATION, SET_NOTIFICATION } from '../actions/types';
import ErrorNotification from './ErrorNotification';
import DeleteDialog from './DeleteDialog';
import Auth from './Auth';
import submitLogin from '../actions/login';

import '../styles/Dialog.css';

const Notification = (props) => {
  const dispatch = useDispatch();

  const { notification } = props;
  const { type, data, isOpen } = notification;

  const onReload = () => {
    window.location.reload();
  };

  const onConfirmDelete = (password) => {
    if (!data.isAuthRequired) {
      dispatch(data.func);
      dispatch({
        type: HIDE_NOTIFICATION,
      });
    } else if (type !== 'authentication') {
      dispatch({
        type: SET_NOTIFICATION,
        payload: { type: 'authentication', data: { func: data.func, isAuthRequired: true } },
      });
    } else {
      dispatch(submitLogin(props.user.email, password, true)).then((resp) => {
        if (resp.success) {
          dispatch(data.func);
          dispatch({
            type: HIDE_NOTIFICATION,
          });
        } else {
          const errors = [];
          errors.push(resp.error.message);
          dispatch({
            type: SET_NOTIFICATION,
            payload: { type: 'error', data: { errors } },
          });
        }
      });
    }
  };

  const onCloseNotification = () => {
    dispatch({
      type: HIDE_NOTIFICATION,
    });
  };

  const displayNotification = () => {
    switch (type) {
      case 'error':
        return (
          <ErrorNotification
            messages={data.errors}
            onReload={onReload}
          />
        );
      case 'delete':
        return (
          <DeleteDialog
            data={{ type: data.type, name: data.name }}
            onCloseNotification={onCloseNotification}
            onConfirmDelete={onConfirmDelete}
          />
        );
      case 'authentication':
        return (
          <Auth
            onCloseNotification={onCloseNotification}
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
            {displayNotification()}
          </div>
        )
      }
    </div>
  );
};

Notification.propTypes = {
  notification: PropTypes.shape({
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
  notification: state.notification,
  user: state.user,
});

export default connect(mapStateToProps)(Notification);
