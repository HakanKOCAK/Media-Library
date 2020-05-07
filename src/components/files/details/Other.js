import React from 'react';
import PropTypes from 'prop-types';

const Other = (props) => {
    const { url } = props

    return (
        <div className='mediaContainer'>
            <a href={url} target="_blank">Download File</a>
        </div>
    )
}

Other.propTypes = {
    url: PropTypes.string.isRequired
}
export default Other;