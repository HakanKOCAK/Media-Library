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
            <div style={{ textAlign: 'center' }}>
                There are no files.
            </div>
        )
    }

    const onDelete = (submissionId) => {
        dispatch(deleteFile(submissionId));
    }
    const handleClick = (event, submissionId) => {
        if (event.target.className === 'clickable') {
            props.history.push('/files/' + submissionId);
        }
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
                            <tr key={item.submissionId} onClick={event => handleClick(event, item.submissionId)}>
                                <td className="clickable">
                                    {item.nameSurname}
                                </td>
                                <td className="clickable">
                                    {item.email}
                                </td>
                                <td className="clickable">
                                    {item.uploadDate}
                                </td>
                                <td className="clickable">
                                    {item.entity.fileName}
                                </td>
                                <td className="clickable">
                                    {item.fileType}
                                </td>
                                <td className="clickable">
                                    {item.entity.size}
                                </td>
                                <td className="clickable">
                                    -
                                </td>
                                <td>
                                    <FontAwesomeIcon className='icon' icon={faTrashAlt} size="1x" onClick={event => onDelete(event, item.submissionId)} />
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
