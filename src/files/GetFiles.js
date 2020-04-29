import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getAllFiles } from '../actions/files';
import PropTypes from 'prop-types';

const GetFiles = (props) => {
    const dispatch = useDispatch();

    const token = localStorage.getItem('medialibrary.user.token')
    useEffect(() => {
        if (token) {
            dispatch(getAllFiles());
        }
    }, [dispatch])

    return (
        // eslint-disable-next-line react/no-children-prop
        <React.Fragment children={props.children} />
    )
}

GetFiles.propTypes = {
    children: PropTypes.element.isRequired
};

export default GetFiles