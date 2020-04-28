import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Spinner from '../spinner/Spinner';

const FileDetails = (props) => {
    const { id } = props.match.params

    const files = useSelector(({ files }) => files.entities)

    const [file, setFile] = useState(null);

    useEffect(() => {
        setFile(files[id])
    }, [files])

    if (!file) {
        return <Spinner />
    }
    return (
        <div>
            file details
        </div>
    )
}

export default FileDetails