import React from 'react';

const ThreadPreviewBlock = () => {
    return (
        <div className='thread-block-container'>
            <div>
                <div>
                    <b>{this.props.Thread.name}</b> - <i>posted by <b>{this.props.Thread.author}</b> n units of time ago -</i>
                    <span id='thread-likes-replies'>
                        Likes: {this.props.Thread.likes} Replies: {this.props.Thread.replies}
                    </span>
                </div>
                <p>
                    {this.props.Thread.body}
                </p>
            </div>
            <b>See More...</b>
        </div>
    )
}

export default ThreadPreviewBlock;