import React from 'react';
import { connect } from 'react-redux';
import FileList from './FileList';
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
const mapStateToProps = state => ({
    loading: state.files.loading
});

export default connect(mapStateToProps)(Files);
