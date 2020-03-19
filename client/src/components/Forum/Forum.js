import React from 'react';
import ThreadPreviewBlock from './forum_components/ThreadPreviewBlock';
import './Forum.css';

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

const Forum =()=>{
    return(
        <div>        
            <div className="image-container">
                <img src='http://picsum.photos/1440/91' style={{width:'100%',height:'auto'}}/>
                <div className='forum-title'><span>Connect With The Community!</span></div>
            </div>
            <div className="forum-content">
                <div className="forum-column-1">
                    <div>Search bar</div>
                    <h1>Pinned Threads</h1>
                    <ThreadPreviewBlock />
                    <h1>Popular</h1>
                    <h1>Latest</h1>
                </div>
                <div className="forum-column-2">
                    <h1>Did You Know?</h1>
                    <p><i>Check out some of the links picked by our team!</i></p>
                </div>
            </div>
        </div>
    );
}

export default Forum;