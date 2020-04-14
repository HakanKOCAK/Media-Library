import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { connect } from 'react-redux';

import { getAllFiles } from '../actions/files';

const Files = ({ getAllFiles, isAuthenticated }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        getAllFiles();
    }, [])

    return (
        <div>
            Files
        </div>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: true
})

export default connect(mapStateToProps, { getAllFiles })(Files)