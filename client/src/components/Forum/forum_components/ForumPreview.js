import React from 'react';
import ThreadPreviewBlock from './ThreadPreviewBlock.js';

const ForumPreview = () => {
    return (
        <div>
            <h1>Pinned Threads</h1>
            <ThreadPreviewBlock />
            <h1>Popular</h1>
            <ThreadPreviewBlock />
            <h1>Latest</h1>
            <ThreadPreviewBlock />
        </div>
    )
}

export default ForumPreview;