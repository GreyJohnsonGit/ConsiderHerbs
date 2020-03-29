import React from 'react';
import ThreadPreviewBlock from './ThreadPreviewBlock.js';

const ForumPreview = () => {
    return (
        <div className='forum-preview'>
            <h3>Pinned Threads</h3>
            <ThreadPreviewBlock />
            <h3>Popular</h3>
            <ThreadPreviewBlock />
            <h3>Latest</h3>
            <ThreadPreviewBlock />
        </div>
    )
}

export default ForumPreview;