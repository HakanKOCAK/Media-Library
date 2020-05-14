import React, { Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { formId } from '../../config/config';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types';
import { deleteFile } from '../../actions/files';

import '../../styles/Files.css'

const FileList = (props) => {
    const dispatch = useDispatch();
    const { files } = props
    const filesArray = Object.values(files)

    if (!files) {
        return null;
    }

    if (filesArray.length === 0) {
        return (
            <div>
                There are no files.
            </div>
        )
    }

    const onDelete = (submissionId) => {
        deleteFile(submissionId)(dispatch);
    }

    const handleClick = (submissionId) => {
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
                            <tr key={item.submissionId}>
                                <td onClick={() => handleClick(item.submissionId)}>
                                    {item.nameSurname}
                                </td>
                                <td onClick={() => handleClick(item.submissionId)}>
                                    {item.email}
                                </td>
                                <td onClick={() => handleClick(item.submissionId)}>
                                    {item.uploadDate}
                                </td>
                                <td onClick={() => handleClick(item.submissionId)}>
                                    {item.entity.fileName}
                                </td>
                                <td onClick={() => handleClick(item.submissionId)}>
                                    {item.fileType}
                                </td>
                                <td onClick={() => handleClick(item.submissionId)}>
                                    {item.entity.size}
                                </td>
                                <td onClick={() => handleClick(item.submissionId)}>
                                    -
                                </td>
                                <td>
                                    <FontAwesomeIcon className='icon' icon={faTrashAlt} size="1x" onClick={() => onDelete(item.submissionId)} />
                                </td>
                            </tr>
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
