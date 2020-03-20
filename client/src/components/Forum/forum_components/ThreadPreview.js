import React from 'react';

const ThreadPreview = (props) => {
    return (
        <div>
            <div>
                <b>{props.Thread.name}</b> - <i>posted by <b>{props.Thread.user}</b> n units of time ago -</i>
                <span id='thread-preview-likes-replies'>
                    Likes: {props.Thread.likes} Replies: {props.Thread.replies.length}
                </span>
            </div>
            <p className='thread-preview-body'>
                {props.Thread.body}
            </p>
        </div>
    )
}

export default ThreadPreview;