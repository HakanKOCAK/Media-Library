import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { HIDE_ERROR } from '../actions/types';
import { faTimesCircle, faSyncAlt } from '@fortawesome/free-solid-svg-icons'
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
                        <span>{message}</span>
                        <span>Please reload the page.</span>
                        <div>
                            <FontAwesomeIcon className='errorIcon' icon={faSyncAlt} onClick={onReload} size="1x" />
                            <FontAwesomeIcon className='errorIcon' icon={faTimesCircle} onClick={handleClose} size="1x" />
                        </div>
                    </div>
                )
            }
        </div>
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