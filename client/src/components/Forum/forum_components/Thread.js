import React from 'react';
import { useParams } from 'react-router-dom';

const Thread = () => {
    let {threadId} = useParams();

    return (
        <div>
            Thread {threadId}
        </div>
    )
}

export default Thread;