import React, { useEffect } from 'react';
import { useDispatch, connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
import { getAllFiles } from '../../actions/files';
import { logoutUser } from '../../actions/user';
import FileList from './FileList';
import '../../styles/Files.css';

const Files = () => {
    const dispatch = useDispatch();
    const token = localStorage.getItem('medialibrary.user.token');
    useEffect(() => {
        dispatch(getAllFiles());
    }, [])

    //Redirect if not Logged in 
    if (!token) {
        return <Redirect to='/' />
    }

    return (

        <section className='container'>
            <button onClick={() => { dispatch(logoutUser()) }}>Logout</button>
            <h1 className='h1'>Files</h1>
            <FileList />
        </section>
    )
}

const mapStateToProps = state => ({

})

export default connect(mapStateToProps, {})(Files)