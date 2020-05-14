import React from 'react';
import ReactPlayer from 'react-player'
import PropTypes from 'prop-types';

const Video = (props) => {
    const { url } = props

    return (
        <div className='mediaContainer'>
            <ReactPlayer url={url} controls={true}
            />
        </div>
    )
}

Video.propTypes = {
    url: PropTypes.string.isRequired
}

Video.defaultProps = {
    url: ''
}
export default Video;