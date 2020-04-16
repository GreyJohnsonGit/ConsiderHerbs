import React from 'react';
import ThreadPreviewBlock from './ThreadPreviewBlock.js';

const ForumPreview = () => {
    return (
        <div className='forum-preview'>
            <h3>Pinned Threads</h3>
            <ThreadPreviewBlock type="pinned"/>
            <h3>Popular</h3>
            <ThreadPreviewBlock type="popular"/>
            <h3>Latest</h3>
            <ThreadPreviewBlock type="latest"/>
        </div>
    )
}

export default ForumPreview;