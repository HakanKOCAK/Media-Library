import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';

import '../../styles/Files.css'

const FileList = (props) => {
    const dispatch = useDispatch();
    const files = useSelector(({ files }) => files.entities);

    console.log(files)
    if (!files) {
        return null;
    }

    if (files.length === 0) {
        return (
            <div>
                There are no files.
            </div>
        )
    }

    const handleClick = (item) => {
        props.history.push('/files/' + item.submissionId, { file: item });
    }
    return (
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
                </tr>
            </thead>
            <tbody>
                {files.map(e => {
                    return (
                        <tr key={e.submissionId} onClick={event => handleClick(e)}>
                            <td>
                                {e.data.nameSurname.answer}
                            </td>
                            <td>
                                {e.data.email.answer}
                            </td>
                            <td>
                                {e.uploadDate}
                            </td>
                            <td>
                                -
                            </td>
                            <td>
                                {e.data.fileType.answer}
                            </td>
                            <td>
                                -
                            </td>
                            <td>
                                -
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export default withRouter(FileList);
