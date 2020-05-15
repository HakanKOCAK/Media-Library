import React, { Fragment, useEffect } from 'react';
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

    const nodeClassList = []
    useEffect(() => {
        let node = document.getElementsByClassName('toolbar')[0]

        while (node.hasChildNodes()) {
            const childrens = Array.from(node.children);
            childrens.forEach(child => {
                node = child
                const classList = Array.from(node.classList)
                classList.forEach(className => {
                    nodeClassList.push(className);
                })
            })
        }
    }, [files])

    const handleClick = (event, submissionId) => {
        const classes = Array.from(event.target.parentNode.classList)
        if (nodeClassList.some(className => classes.indexOf(className) !== -1)) {
            if (classes.includes('delete')) {
                dispatch(deleteFile(submissionId));
            }
        } else if (!Array.from(event.target.classList).includes('toolbar')) {
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
                                    <button className='icon'>
                                        <a
                                            style={{ marginTop: '1.3px', textDecoration: 'none', color: 'black' }}
                                            rel="noopener noreferrer"
                                            target="_blank"
                                            href={`https://jotform.com/edit/${item.submissionId}`}
                                        >
                                            <FontAwesomeIcon className='edit' icon={faEdit} size="1x" />
                                        </a>
                                    </button>
                                    <button className='icon' >
                                        <FontAwesomeIcon className='delete' icon={faTrashAlt} size="1x" />
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
