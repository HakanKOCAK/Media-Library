import React, { Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { formId } from '../../config/config';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { deleteFile } from '../../actions/files';
import ListItem from './ListItem';
import { addDuration } from '../../actions/files';

import '../../styles/Files.css'

const FileList = (props) => {
    const dispatch = useDispatch();
    const { files } = props
    const filesArray = Object.values(files)

    const onReady = (submissionId, duration) => {
        dispatch(addDuration({ submissionId, duration }))
    }
    const onEdit = (submissionId) => {
        window.open(`https://jotform.com/edit/${submissionId}`, '_blank');
    }

    const onDelete = (submissionId) => {
        dispatch(deleteFile(submissionId));
    }

    const handleClick = (classList, submissionId) => {
        if (!classList.includes('toolbar'))
            props.history.push('/files/' + submissionId);
    }
    return (
        <Fragment>
            <table className="table">
                <thead>
                    <tr>
                        <th>Name Surname</th>
                        <th>E-mail</th>
                        <th>Upload Date</th>
                        <th>File Name</th>
                        <th>File Type</th>
                        <th>File Size</th>
                        <th>Duration</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {filesArray.map((item) => {
                        return (
                            <ListItem
                                key={item.submissionId}
                                handleClick={handleClick}
                                onEdit={onEdit}
                                onDelete={onDelete}
                                onReady={onReady}
                                file={item} />
                        )
                    })}
                </tbody>
            </table>
            <a
                rel="noopener noreferrer"
                target="_blank"
                href={`https://form.jotform.com/${formId}`}
                className="newLink"
            >
                New File
            </a>
        </Fragment>
    )
}

FileList.propTypes = {
    files: PropTypes.object.isRequired,
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }),
};


FileList.defaultProps = {
    files: {}
}

export default withRouter(FileList);
