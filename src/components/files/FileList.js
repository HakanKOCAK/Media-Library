import React, { Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { formId } from '../../config/config';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types';
import { deleteFile } from '../../actions/files';

import '../../styles/Files.css'

const FileList = (props) => {
    const dispatch = useDispatch();
    const { files } = props
    const filesArray = Object.values(files)

    const onEdit = (event, submissionId) => {
        event.stopPropagation();
        window.open(`https://jotform.com/edit/${submissionId}`, '_blank');
    }

    const onDelete = (event, submissionId) => {
        event.stopPropagation();
        dispatch(deleteFile(submissionId));
    }

    const handleClick = (event, submissionId) => {
        if (!Array.from(event.target.classList).includes('toolbar'))
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
                            <tr key={item.submissionId} onClick={event => handleClick(event, item.submissionId)}>
                                <td>
                                    {item.nameSurname}
                                </td>
                                <td>
                                    {item.email}
                                </td>
                                <td>
                                    {item.uploadDate}
                                </td>
                                <td>
                                    {item.entity.fileName}
                                </td>
                                <td>
                                    {item.fileType}
                                </td>
                                <td>
                                    {item.entity.size}
                                </td>
                                <td>
                                    -
                                </td>
                                <td className='toolbar'>
                                    <button className='icon' onClick={event => onEdit(event, item.submissionId)}>
                                        <FontAwesomeIcon icon={faEdit} size="1x" />
                                    </button>
                                    <button className='icon' onClick={event => onDelete(event, item.submissionId)}>
                                        <FontAwesomeIcon icon={faTrashAlt} size="1x" />
                                    </button>
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
