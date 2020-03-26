import React from 'react';
//import { useParams } from 'react-router-dom';

const dummyThread = {
    threadId: 'threadId',
    userId: 'userId',
    title: 'Some Thread',
    user: '@JaneDoe',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat...',
    likes: 0,
    replies: []
}

const Thread = () => {
    //let {threadId} = useParams();

    return (
        <div>
            <h1>{dummyThread.title}</h1>
            {dummyThread.body}
        </div>
    )
}

export default Thread;