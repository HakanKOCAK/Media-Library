import React, { Fragment } from 'react';
import FileList from './FileList';
import PropTypes from 'prop-types';
import '../../styles/Files.css';

const Files = (props) => {

    const { files } = props
    return (
        <Fragment>
            <h1 className='h1'>Files</h1>
            <FileList files={files.entities} />
        </Fragment>
    )
}

Files.propTypes = {
    files: PropTypes.shape({
        entities: {}
    })
}

Files.defaultProps = {
    files: {}
}

export default Files;
