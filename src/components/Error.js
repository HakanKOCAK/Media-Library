import React from 'react'
import PropTypes from 'prop-types';

const Error = props => {

    const errorMessages = {
        PASSWORDS_DO_NOT_MATCH: 'Passwords do not match.',
        PASSWORD_LENGTH: 'Minimum password lenght is 6.',
        EMAIL_FORMAT: 'Wrong email format.',
        NO_ACCOUNT: 'User Not Found. Please check your credentials.',
        USER_DISABLED: 'Sorry, it seems like the account has been disabled by an administrator.',
        USER_EXIST: 'User already exist.'
    }

    const { flags } = props;

    console.log(flags)
    return (
        <div className="error-div">
            {
                Object.keys(flags).map(key => {
                    const val = flags[key];
                    if (val) {
                        return <p className="my-1">{errorMessages[key]}</p>
                    }
                })
            }
        </div>
    )
}

Error.propTypes = {
    flags: PropTypes.object.isRequired
}

export default Error;