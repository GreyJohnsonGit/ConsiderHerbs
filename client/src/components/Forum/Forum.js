import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import ForumPreview from './forum_components/ForumPreview.js';
import Thread from './forum_components/Thread.js';
import DidYouKnow from './forum_components/DidYouKnow.js';
import NewThread from './forum_components/NewThread.js';
import './Forum.css';

const Forum =()=>{
    const [ showPopup, setShowPopup ] = useState(0);

    const toggleShowPopup = () => {
        setShowPopup(!showPopup);
    };

    return(
        <div>        
            <div className="image-container">
                <img alt="photos" src='http://picsum.photos/1440/91' style={{width:'100%',height:'auto'}}/>
                <div className='forum-title'><span>Connect With The Community!</span></div>
            </div>
            { showPopup ? <NewThread closeFn={toggleShowPopup}/> : null}
            <div className="forum-content">
                <div className="forum-column-1">
                    <div className="search" id="search_bar">
                        <form>
                            <input type="text" placeholder="Search Threads..."/>
                            <button type="submit">Search</button>
                            <button type='button' onClick={toggleShowPopup}>New Thread</button>
                        </form>
                    </div>
                    <Switch>
                        <Route exact path='/Forum' component={ForumPreview} />
                        <Route path={`/Forum/:threadId`} component={Thread} />
                    </Switch>
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