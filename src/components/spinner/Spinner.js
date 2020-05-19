import React, { Fragment } from 'react';
import spinner from './spinner.gif';
import PropTypes from 'prop-types';

const styles = {
    'height': '100vh',
    'justifyContent': 'center',
    'alignItems': 'center',
    'flexDirection': 'column',
    'display': 'flex'
}
const Spinner = (props) => {
    const { styled, duration } = props
    return (
        <Fragment>
            <div style={!styled ? {} : { styles }}>
                {
                    !duration
                        ?
                        <img
                            src={spinner}
                            style={{ width: '200px', margin: 'auto', display: 'block' }}
                            alt='Loading...'
                        />
                        :
                        <img
                            src={spinner}
                            style={{ width: '65px', height: '65px' }}
                            alt='Loading...'
                        />
                }
            </div>
        </Fragment>
    )
};

Spinner.propTypes = {
    styled: PropTypes.bool,
    duration: PropTypes.bool
}

export default Spinner;