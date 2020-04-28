import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getAllFiles } from '../../actions/files';
import { logoutUser } from '../../actions/user';
import FileList from './FileList';
import '../../styles/Files.css';

const Files = (props) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllFiles());
    }, [])

    return (

        <section className='container'>
            <h1 className='h1'>Files</h1>
            <FileList />
        </section>
    )
}

export default Files