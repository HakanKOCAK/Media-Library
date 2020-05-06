import React from 'react'
import PropTypes from 'prop-types';

const Image = (props) => {
    const onLoad = () =>{
        
    }

    return (
        <img className='media' src={props.image} onLoad={onLoad}/>
    )
}

Image.propTypes = {
    image: PropTypes.string.isRequired
}

export default Image