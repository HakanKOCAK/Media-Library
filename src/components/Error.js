import React from 'react'
import PropTypes from 'prop-types';
import { errorMessages } from '../Utils/errors';

const Error = props => {
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