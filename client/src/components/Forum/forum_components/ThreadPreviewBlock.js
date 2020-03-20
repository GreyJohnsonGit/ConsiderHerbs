import React, {useState} from 'react';
import ThreadPreview from './ThreadPreview.js'

const dummyThread = {
    threadId: 'id',
    userId: 'id',
    name: 'Some Thread',
    user: '@JaneDoe',
    body: 'Lorem ipsum dolor sit amet, \
            consectetur adipiscing elit, \
            sed do eiusmod tempor incididunt \
            ut labore et dolore magna aliqua. \
            Ut enim ad minim veniam, quis \
            nostrud exercitation ullamco \
            laboris nisi ut aliquip ex ea commodo consequat...',
    likes: 0,
    replies: []
}

const ThreadPreviewBlock = () => {
    const [count,setCount] = useState(2);

    let ThreadList = Array(count).fill(dummyThread);

    return (
        <div className='thread-preview-block-container'>
            { ThreadList.map((thread) => {
                return (
                    <ThreadPreview Thread={thread} />
                )
            })}
            <a onClick={() => setCount(count + 2)}>See More...</a>
        </div>
    )
}

export default ThreadPreviewBlock;