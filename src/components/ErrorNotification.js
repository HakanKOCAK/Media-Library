import React from 'react';
import { HIDE_ERROR } from '../actions/types';
import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import '../styles/ErrorNotification.css';

export const ErrorNotification = (props) => {
    const dispatch = useDispatch();

    const { error } = props
    const { message, isOpen } = error
    const onReload = () => {
        window.location.reload();
    }
    const handleClose = () => {
        dispatch({ type: HIDE_ERROR })
    }

    return (
        <div className='errorContainer'>
            {
                isOpen && message && (
                    <div className="errorNotification">
                        <span className='error-msg'>{message}</span>
                        <span>Please reload the page.</span>
                        <div className='button-div'>
                            <button className='btn btn-primary' onClick={onReload}>Reload</button>
                            <button className='btn btn-primary' onClick={handleClose}>Close</button>
                        </div>
                    </div>
                )
            }
        </div >
    )
}

ErrorNotification.propTypes = {
    error: PropTypes.shape({
        message: PropTypes.string,
        isOpen: PropTypes.bool
    })
}

ErrorNotification.defaultProps = {
    error: PropTypes.shape({
        message: '',
        isOpen: false
    })
}

const mapStateToProps = state => {
    return {
        error: state.error
    }
}

export default connect(mapStateToProps)(ErrorNotification)