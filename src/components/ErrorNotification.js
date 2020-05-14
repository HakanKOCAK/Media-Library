import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { HIDE_ERROR } from '../actions/types';
import { faTimesCircle, faSyncAlt } from '@fortawesome/free-solid-svg-icons'
import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

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
        <>
            {
                isOpen && message && (
                    <div className="errorNotification">
                        <FontAwesomeIcon icon={faTimesCircle} onClick={handleClose} size="1x" />
                        <span>{message}</span>
                        <FontAwesomeIcon icon={faSyncAlt} onClick={onReload} size="1x" />
                    </div>
                )
            }
        </>
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