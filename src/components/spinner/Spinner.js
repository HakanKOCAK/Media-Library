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
    const { styled } = props
    return (
        <Fragment>
            <div style={!styled ? {} : { styles }}>
                <img
                    src={spinner}
                    style={{ width: '200px', margin: 'auto', display: 'block' }}
                    alt='Loading...'
                />
            </div>
        </Fragment>
    )
};

Spinner.propTypes = {
    styled: PropTypes.bool
}

export default Spinner;