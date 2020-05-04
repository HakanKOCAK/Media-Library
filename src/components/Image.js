import React from 'react'
import PropTypes from 'prop-types';

const Image = (props) => {
    return (
        <img className='media' src={props.image} />
    )
}

Image.propTypes = {
    image: PropTypes.string.isRequired
}

export default Image