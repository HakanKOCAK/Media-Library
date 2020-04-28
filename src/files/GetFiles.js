import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getAllFiles } from '../actions/files';

const GetFiles = (props) => {
    const dispatch = useDispatch();

    const token = localStorage.getItem('medialibrary.user.token')
    useEffect(() => {
        if (token) {
            dispatch(getAllFiles());
        }
    }, [dispatch])

    return (
        <React.Fragment children={props.children} />
    )
}

export default GetFiles