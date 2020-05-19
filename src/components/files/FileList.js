import React, { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';
import { formId } from '../../config/config';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types';
import { deleteFile } from '../../actions/files';
import ReactPlayer from 'react-player'
import Spinner from '../spinner/Spinner';

import '../../styles/Files.css'

const FileList = (props) => {
    const dispatch = useDispatch();
    const { files } = props
    const filesArray = Object.values(files)

    const [durations, setDurations] = useState({})

    console.log('durations', durations)
    const onReady = (state, submissionId) => {
        const newDurations = { ...durations };
        newDurations[submissionId] = state.getDuration();
        setDurations(newDurations)
    }
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
                        const submissionId = item.submissionId
                        return (
                            <tr key={submissionId} onClick={event => handleClick(event, submissionId)}>
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
                                <td style={{ fontSize: '11px' }}>
                                    {
                                        item.fileType === 'Video/Audio'
                                            ?
                                            durations[submissionId]
                                                ?
                                                durations[submissionId]
                                                :
                                                <Spinner styled={false} duration={true} />
                                            :
                                            'Not available'
                                    }

                                </td>
                                <td className='toolbar'>
                                    <button className='icon' onClick={event => onEdit(event, submissionId)}>
                                        <FontAwesomeIcon icon={faEdit} size="1x" />
                                    </button>
                                    <button className='icon' onClick={event => onDelete(event, submissionId)}>
                                        <FontAwesomeIcon icon={faTrashAlt} size="1x" />
                                    </button>
                                </td>
                                {
                                    item.fileType === 'Video/Audio'
                                        ?
                                        <td style={{ display: 'none' }} >
                                            <ReactPlayer url={item.entity.url} onReady={state => onReady(state, submissionId)} />
                                        </td>
                                        :
                                        null
                                }
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
