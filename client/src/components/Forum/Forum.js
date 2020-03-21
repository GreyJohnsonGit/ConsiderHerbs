import React from 'react';
import ThreadPreviewBlock from './forum_components/ThreadPreviewBlock.js';
import DidYouKnow from './forum_components/DidYouKnow.js';
import './Forum.css';

const Forum =()=>{
    return(
        <div>        
            <div className="image-container">
                <img src='http://picsum.photos/1440/91' style={{width:'100%',height:'auto'}}/>
                <div className='forum-title'><span>Connect With The Community!</span></div>
            </div>
            <div className="forum-content">
                <div className="forum-column-1">
                    <div className = "search" id="search_bar">
                        <form>
                            <input type="text" placeholder="Search Threads..."/>
                            <button type="submit">Search</button>
                        </form>
                    </div>
                    <h1>Pinned Threads</h1>
                    <ThreadPreviewBlock />
                    <h1>Popular</h1>
                    <ThreadPreviewBlock />
                    <h1>Latest</h1>
                    <ThreadPreviewBlock />
                </div>
                <div className="forum-column-2">
                    <h1>Did You Know?</h1>
                    <p><i>Check out some of the links picked by our team!</i></p>
                    <DidYouKnow />
                </div>
            </div>
        </div>
    );
}

export default Forum;