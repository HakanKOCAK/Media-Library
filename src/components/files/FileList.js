import React from 'react';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../../styles/Files.css'

const FileList = (props) => {
    const files = useSelector(({ files }) => files.entities);
    const filesArray = Object.values(files)
    console.log(filesArray)
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

    const handleClick = (event, item) => {
        event.preventDefault()
        props.history.push('/files/' + item.submissionId);
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
                {filesArray.map((item) => {
                    return (
                        <tr key={item.submissionId} onClick={event => handleClick(event, item)}>
                            <td>
                                {item.data.nameSurname.answer}
                            </td>
                            <td>
                                {item.data.email.answer}
                            </td>
                            <td>
                                {item.uploadDate}
                            </td>
                            <td>
                                {item.data.fileName}
                            </td>
                            <td>
                                {item.data.fileType.answer}
                            </td>
                            <td>
                                {item.data.size}
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

FileList.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }),
};

export default withRouter(FileList);
