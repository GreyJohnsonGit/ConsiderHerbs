import React, { useState } from 'react';
import {useCookies} from 'react-cookie';
import { Route, Switch, Link } from 'react-router-dom';
import ForumPreview from './forum_components/ForumPreview.js';
import Thread from './forum_components/Thread.js';
import DidYouKnowPreview from './forum_components/DidYouKnowPreview.js';
import DidYouKnow from './forum_components/DidYouKnow.js';
import NewThread from './forum_components/NewThread.js';
import ForumImage from './Forum_Image.jpg';
import './Forum.css';
import ThreadPreviewBlock from './forum_components/ThreadPreviewBlock.js';

const Forum =()=>{
    const [ showPopup, setShowPopup ] = useState(0);
    const [ threadFilterText, setThreadFilterText ] = useState("");
    const [cookies, ] = useCookies(['user']);

    const toggleShowPopup = () => {
        setShowPopup(!showPopup);
    };

    const searchForThread = () => {

    }

    console.log(cookies)

    return(
        <div>        
            <div className="image-container">

                <div className="image-div">
                    <img alt="Forum" src={ForumImage} className="forum-image"></img>
                </div>

                <div className='forum-title'><span>Connect With The Community!</span></div>
            </div>
            { showPopup ? <NewThread closeFn={toggleShowPopup}/> : null}
            <div className="forum-content">
                <div className="forum-column-1">
                    <div className="search" id="search_bar">
                        <form>
                            <input type="text" value={threadFilterText} onChange={ev => setThreadFilterText(ev.target.value)} placeholder="Search Threads..."/>
                            <button type="submit" onClick={searchForThread}>Search</button>
                            { cookies.user && cookies.user.userLevel ?
                                <button type='button' onClick={toggleShowPopup}>New Thread</button>
                            : null }
                        </form>
                    </div>
                    <ThreadPreviewBlock type="search" filterText={threadFilterText}></ThreadPreviewBlock>
                    <Switch>
                        <Route exact path='/Forum' component={ForumPreview} />
                        <Route path={`/Forum/:threadId`} component={Thread} />
                    </Switch>
                </div>
                <div className="column-2-container">
                    {cookies.user && cookies.user.userLevel?
                    <div className="forum-column-2">
                        <div id="title"><a href={'/DidYouKnow'} style={{color:"#363636"}}>Did You Know?</a></div>
                        <p><i>Check out some of the links picked by our team!</i></p>
                       
                         <DidYouKnowPreview />
                    </div>:
                   
                    <div className="forum-column-2">
                        <div id="title"><a href={'/SignIn'} style={{color:"#363636"}}>Did You Know?</a></div>
                        <p><i>Log in to check out some of the links picked by our team!</i></p>
                    </div>
                    }


                </div>
            </div>
        </div>
    );
}

export default Forum;