import React from 'react';
import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { HIDE_ERROR } from '../actions/types';

import '../styles/Dialog.css';

const ErrorNotification = (props) => {
  const dispatch = useDispatch();

  const { error } = props;
  const { message, isOpen, errorTypes } = error;

  const onReload = () => {
    window.location.reload();
  };

  const onClose = () => {
    dispatch({
      type: HIDE_ERROR,
    });
  };

  return (
    <div className="dialog-container">
      {
        isOpen && message && (
          <div className="dialog-notification">
            <span className="dialog-msg">{message}</span>
            {
              errorTypes.includes('tag') ? <span>Tag cannot be empty</span> : null
            }
            {
              errorTypes.includes('interval') ? (
                <>
                  <span>Interval Format is:</span>
                  <span>00:00:00 / 00:00:05</span>
                </>
              )
                : null
            }
            {
              errorTypes.length === 0 ? (
                <>
                  <span>Tag cannot be empty</span>
                  <div className="button-div">
                    <button type="button" className="btn btn-primary" onClick={onReload}>Reload</button>
                  </div>
                </>
              )
                : (
                  <div className="button-div">
                    <button type="button" className="btn btn-primary" onClick={onClose}>Close</button>
                  </div>
                )
            }
          </div>
        )
      }
    </div>
  );
};

ErrorNotification.propTypes = {
  error: PropTypes.shape({
    message: PropTypes.string,
    isOpen: PropTypes.bool,
    errorTypes: PropTypes.array,
  }),
};

ErrorNotification.defaultProps = {
  error: PropTypes.shape({
    message: '',
    isOpen: false,
    errorTypes: [],
  }),
};

const mapStateToProps = (state) => ({
  error: state.error,
});

export default connect(mapStateToProps)(ErrorNotification);
