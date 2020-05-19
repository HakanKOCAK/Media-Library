import React from 'react';
import spinner from './spinner.gif';
import PropTypes from 'prop-types';

const styles = {
    'height': '80vh',
    'justifyContent': 'center',
    'alignItems': 'center',
    'flexDirection': 'column',
    'display': 'flex'
}
const Spinner = (props) => {
    const { styled, duration } = props
    return (
        <div style={styled ? styles : {}}>
            {
                !duration
                    ?
                    <img
                        src={spinner}
                        style={{ width: '45px', margin: 'auto', display: 'block' }}
                        alt='Loading...'
                    />
                    :
                    <img
                        src={spinner}
                        style={{ width: '22px' }}
                        alt='Loading...'
                    />
            }
        </div>
    )
};

Spinner.propTypes = {
    styled: PropTypes.bool,
    duration: PropTypes.bool
}

Spinner.defaultProps = {
    styled: true,
    duration: false
}

export default Spinner;