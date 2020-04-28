import React, { Fragment } from 'react';
import spinner from './spinner.gif';

const styles = {
    'height': '100vh',
    'justifyContent': 'center',
    'alignItems': 'center',
    'flexDirection': 'column',
    'display': 'flex'
}
export default () => (
    <Fragment>
        <div style={styles}>
            <img
                src={spinner}
                style={{ width: '200px', margin: 'auto', display: 'block' }}
                alt='Loading...'
            />
        </div>
    </Fragment>
);