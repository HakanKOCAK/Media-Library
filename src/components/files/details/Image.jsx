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
    <div className="imageContainer">
      <Spinner styled={false} />
      <img
        alt="submittedImage"
        className="image"
        src={url}
        style={loaded ? { opacity: '1' } : { opacity: '0' }}
        onLoad={() => handleImageLoaded()}
      />
    </div>
  );
};

Image.propTypes = {
  url: PropTypes.string.isRequired,
};

export default Image;
