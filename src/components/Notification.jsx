import React from 'react';
import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { HIDE_NOTIFICATION } from '../actions/types';

import '../styles/Dialog.css';
import ErrorNotification from './ErrorNotification';

const Notification = (props) => {
  const dispatch = useDispatch();

  const { notification } = props;
  const { type, data, isOpen } = notification;

  const onReload = () => {
    window.location.reload();
  };

  const onClose = () => {
    dispatch({
      type: HIDE_NOTIFICATION,
    });
  };

  return (
    <div className="dialog-container">
      {
        isOpen && type && (
          <div className="dialog-notification">
            <span>{type.toUpperCase()}</span>
            {type === 'error' ? <ErrorNotification messages={data.errors} onReload={onReload} /> : null}
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
    }).isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  notification: state.notification,
});

export default connect(mapStateToProps)(Notification);
