import React from 'react';
import FileList from './FileList';
import '../../styles/Files.css';

const Files = (props) => {

    return (

        <section className='container'>
            <h1 className='h1'>Files</h1>
            <FileList />
        </section>
    )
}

export default Files