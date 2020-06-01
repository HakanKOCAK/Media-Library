import React from 'react';
import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { HIDE_NOTIFICATION } from '../actions/types';
import ErrorNotification from './ErrorNotification';
import DeleteDialog from './DeleteDialog';

import '../styles/Dialog.css';

const Notification = (props) => {
  const dispatch = useDispatch();

  const { notification } = props;
  const { type, data, isOpen } = notification;

  const onReload = () => {
    window.location.reload();
  };

  const onConfirmDelete = () => {
    dispatch(data.func);
    dispatch({
      type: HIDE_NOTIFICATION,
    });
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
      type: PropTypes.string,
      name: PropTypes.string,
      func: PropTypes.func,
    }).isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  notification: state.notification,
});

export default connect(mapStateToProps)(Notification);
