import React from 'react'
import PropTypes from 'prop-types';
import { errorMessages } from '../Utils/errors';

const Error = props => {
    const { flags } = props;

    return (
        <div className="error-div">
            {
                Object.keys(flags).map((key, index) => {
                    const val = flags[key];
                    if (val) {
                        return <p key={index} className="my-1">{errorMessages[key]}</p>
                    }
                    return null;
                })
            }
        </div>
    )
}

Error.propTypes = {
    flags: PropTypes.object.isRequired
}

export default Error;