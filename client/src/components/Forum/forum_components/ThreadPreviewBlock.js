import React, {useState} from 'react';

const dummyThread = {
    threadId: 'threadId',
    userId: 'userId',
    title: 'Some Thread',
    user: '@JaneDoe',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat...',
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
                    <div>
                        <div>
                            <a className='thread-preview-title' href={`/Forum/${thread.threadId}`}>{thread.title}</a> - <i>posted by <b>{thread.user}</b> n units of time ago -</i>
                            <span id='thread-preview-likes-replies'>
                                Likes: {thread.likes} Replies: {thread.replies.length}
                            </span>
                        </div>
                        <p className='thread-preview-body'>
                            {thread.body}
                        </p>
                    </div>
                )
            })}
            {/*eslint-disable-next-line*/}
            <a onClick={() => setCount(count + 2)} className='thread-preview-block-link'>See More...</a>
        </div>
    )
}

export default ThreadPreviewBlock;