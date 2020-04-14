import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const FileList = () => {
    const dispatch = useDispatch();
    const files = useSelector(({ files }) => files.entities);

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
                {files.map((e, index) => {
                    return (
                        <tr key={`file${index + 1}`}>
                            <td>
                                {e.nameSurname}
                            </td>
                            <td>
                                {e.email}
                            </td>
                            <td>
                                {e.uploadDate}
                            </td>
                            <td>
                                -
                            </td>
                            <td>
                                {e.fileType}
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

export default FileList
