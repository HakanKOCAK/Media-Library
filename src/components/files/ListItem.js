import React from 'react';
import PropTypes from 'prop-types';
import Spinner from '../spinner/Spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ReactPlayer from 'react-player'
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons'
import prettyMilliseconds from 'pretty-ms';

const ListItem = (props) => {
    const { file } = props

    const submissionId = file.submissionId

    const handleClick = (event) => {
        props.handleClick(Array.from(event.target.classList), submissionId);
    }

    const onDelete = (event) => {
        event.stopPropagation();
        props.onDelete(submissionId);
    }

    const onEdit = (event) => {
        event.stopPropagation();
        props.onEdit(submissionId);
    }

    const onReady = (state) => {
        const duration = prettyMilliseconds(state.getDuration() * 1000);
        props.onReady(submissionId, duration)
    }

    return (
        <tr onClick={event => handleClick(event)}>
            <td>
                {file.nameSurname}
            </td>
            <td>
                {file.email}
            </td>
            <td>
                {file.uploadDate}
            </td>
            <td>
                {file.entity.fileName}
            </td>
            <td>
                {file.fileType}
            </td>
            <td>
                {file.entity.size}
            </td>
            <td>
                {
                    file.fileType === 'Video/Audio'
                        ?
                        file.entity.duration
                            ?
                            file.entity.duration
                            :
                            <Spinner styled={false} duration={true} />
                        :
                        'N/A'
                }

            </td>
            <td className='toolbar'>
                <button className='icon' onClick={event => onEdit(event)}>
                    <FontAwesomeIcon icon={faEdit} size="1x" />
                </button>
                <button className='icon' onClick={event => onDelete(event)}>
                    <FontAwesomeIcon icon={faTrashAlt} size="1x" />
                </button>
            </td>
            {
                file.fileType === 'Video/Audio'
                    ?
                    <td style={{ display: 'none' }} >
                        <ReactPlayer url={file.entity.url} onReady={state => onReady(state)} />
                    </td>
                    :
                    null
            }
        </tr>
    )
}

ListItem.propTypes = {
    file: PropTypes.object.isRequired,
    handleClick: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    onReady: PropTypes.func.isRequired
}

ListItem.defaultProps = {
    file: {},
    handleClick: () => { },
    onDelete: () => { },
    onEdit: () => { },
    onReady: () => { }
}

export default ListItem