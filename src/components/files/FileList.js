import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../../styles/Files.css'

const FileList = (props) => {
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

    const handleClick = (event, item) => {
        event.preventDefault()
        props.history.push('/files/' + item.submissionId);
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
                    </tr>
                </thead>
                <tbody>
                    {filesArray.map((item) => {
                        return (
                            <tr key={item.submissionId} onClick={event => handleClick(event, item)}>
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
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <a
                rel="noopener noreferrer"
                target="_blank"
                href="https://form.jotform.com/201324174735046"
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
