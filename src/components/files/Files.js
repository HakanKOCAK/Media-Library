import React from 'react';
import { connect } from 'react-redux';
import FileList from './FileList';
import PropTypes from 'prop-types';
import Spinner from '../spinner/Spinner';
import '../../styles/Files.css';

const Files = ({ loading }) => {

    if (loading) {
        return <Spinner />
    }

    return (

        <section className='container'>
            <h1 className='h1'>Files</h1>
            <FileList />
        </section>
    )
}

Files.propTypes = {
    loading: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
    loading: state.files.loading
});

export default connect(mapStateToProps)(Files);
