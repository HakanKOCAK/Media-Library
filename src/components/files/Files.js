import React from 'react';
import FileList from './FileList';
import PropTypes from 'prop-types';
import '../../styles/Files.css';

const Files = (props) => {

    const { files } = props
    return (

        <section className='container'>
            <h1 className='h1'>Files</h1>
            <FileList files={files} />
        </section>
    )
}

Files.propTypes = {
    files: PropTypes.object.isRequired
}

export default Files;
