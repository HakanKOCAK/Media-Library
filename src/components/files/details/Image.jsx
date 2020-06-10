import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Spinner from '../../spinner/Spinner';

const Image = (props) => {
  const { url } = props;
  //  To check if image completely loaded
  const [loaded, setLoaded] = useState(false);

  const handleImageLoaded = () => {
    setLoaded(true);
  };

  return (
    <div className="media-container">
      <div style={loaded ? { display: 'none' } : {}}>
        <Spinner modified />
      </div>
      <div style={loaded ? {} : { display: 'none' }}>
        <img
          alt="submitted-img"
          className="media"
          src={url}
          onLoad={() => handleImageLoaded()}
        />
      </div>
    </div>
  );
};

Image.propTypes = {
  url: PropTypes.string.isRequired,
};

export default Image;
