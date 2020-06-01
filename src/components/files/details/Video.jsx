import React, { useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import PropTypes from 'prop-types';

const Video = (props) => {
  const { url, seekTo } = props;

  const playerRef = useRef(null);
  const [isReady, setReady] = useState(false);

  const onReady = () => {
    setReady(true);
  };

  useEffect(() => {
    function setTo(interval) {
      if (isReady) {
        const hoursMinutesSeconds = interval.split(':');
        const hours = parseInt(hoursMinutesSeconds[0], 10);
        const minutes = parseInt(hoursMinutesSeconds[1], 10);
        const seconds = parseInt(hoursMinutesSeconds[2], 10);
        const toSecond = hours * 3600 + minutes * 60 + seconds;
        playerRef.current.seekTo(toSecond, 'seconds');
      }
    }
    setTo(seekTo);
  }, [seekTo]);

  return (
    <div className="media-container">
      <ReactPlayer
        ref={playerRef}
        url={url}
        controls
        onReady={onReady}
      />
    </div>
  );
};

Video.propTypes = {
  url: PropTypes.string.isRequired,
  seekTo: PropTypes.string,
};

Video.defaultProps = {
  seekTo: '00:00:00',
};

export default Video;
