import React, { useEffect } from 'react';
import { useDispatch, connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
import { getAllFiles } from '../../actions/files';

import FileList from './FileList';
import '../../styles/Files.css';

const Files = ({ getAllFiles, isAuthenticated }) => {
    const dispatch = useDispatch();
    const token = localStorage.getItem('medialibrary.user.token');
    useEffect(() => {
        getAllFiles();
    }, [])

    //Redirect if not Logged in 
    if (!token) {
        return <Redirect to='/' />
    }

    return (

        <section className='container'>
            <h1 className='h1'>Files</h1>
            <FileList />
        </section>
    )
}

const mapStateToProps = state => ({

})

export default connect(mapStateToProps, { getAllFiles })(Files)