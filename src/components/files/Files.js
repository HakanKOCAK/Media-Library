import React, { useEffect } from 'react';
import { useDispatch, connect } from 'react-redux';
import { getAllFiles } from '../../actions/files';

import FileList from './FileList';
import '../../styles/Files.css';

const Files = ({ getAllFiles, isAuthenticated }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        getAllFiles();
    }, [])

    return (

        <section className='container'>
            <h1 className='h1'>Files</h1>
            <FileList />
        </section>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: true
})

export default connect(mapStateToProps, { getAllFiles })(Files)