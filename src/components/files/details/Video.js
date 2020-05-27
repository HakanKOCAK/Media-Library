import React, { useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player'
import PropTypes from 'prop-types';

const Video = (props) => {
    const { url, seekTo } = props

    const playerRef = useRef(null)
    const [isReady, setReady] = useState(false)


    const onReady = () => {
        setReady(true)
    }

    useEffect(() => {
        function setTo(interval) {
            if (isReady) {
                const hoursMinutesSeconds = interval.split(':');
                const hours = parseInt(hoursMinutesSeconds[0]);
                const minutes = parseInt(hoursMinutesSeconds[1]);
                const seconds = parseInt(hoursMinutesSeconds[2]);
                const toSecond = hours * 3600 + minutes * 60 + seconds
                playerRef.current.seekTo(toSecond, 'seconds')
            }
        }
        setTo(seekTo)
    }, [seekTo])

    return (
        <div className='mediaContainer'>
            <ReactPlayer
                ref={playerRef}
                url={url}
                controls={true}
                onReady={onReady}
            />
        </div>
    )
}

Video.propTypes = {
    url: PropTypes.string.isRequired,
    seekTo: PropTypes.string.isRequired
}

Video.defaultProps = {
    url: '',
    seekTo: '00:00:00'
}
export default Video;