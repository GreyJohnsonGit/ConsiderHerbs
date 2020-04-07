import React from 'react';
import ForumImage from '../Forum_Image.jpg';
import DidYouKnowImage from './assets/Did_You_Know_IMG.jpg';
import DidYouKnowContent from './DidYouKnowContent.js';
import DidYouKnowComments from './DidYouKnowComments.js';
import { Route, Switch, Link } from 'react-router-dom';

const dummyPost = {
    postId: 'did i change?',
    title: 'Some Post',
    date: '01/01/2020',
    body: 'Lorem ipsum dolor sit amet, \
            consectetur adipiscing elit, sed \
            do eiusmod tempor incididunt ut \
            labore et dolore magna aliqua. Ut enim ad minim veniam, \
            quis nostrud exercitation ullamco laboris nisi ut aliquip \
            ex ea commodo consequat. Duis aute irure dolor in reprehenderit \
            in voluptate velit esse cillum dolore eu fugiat nulla pariatur. \
            Excepteur sint occaecat cupidatat non proident, sunt in culpa\
            qui officia deserunt mollit anim id est laborum.Duis aute irure \
            dolor in reprehenderit in voluptate velit esse cillum dolore eu \
            fugiat nulla pariatur. Excepteur sint occaecat cupidatat non \
            proident, sunt in culpa qui officia deserunt mollit anim id \
            est laborum.',
    sources: ["Dean, Cornelia. Executive on a Mission: Saving the Planet. The New York Times, 22 May 2007, www.nytimes.com/2007/05/22/science/earth/22ander.html?_r=0. Accessed 29 May 2019."
            , "Ebert, Roger. Review of An Inconvenient Truth, directed by Davis Guggenheim. Ebert Digital LLC, 1 June 2006, www.rogerebert.com/reviews/an-inconvenient-truth-2006. Accessed 15 June 2019."],
    replies: []
}

const dummyComment = {
    threadId: 'threadId',
    userId: 'userId',
    user: '@some_user',
    body: 'Lorem ipsum dolor sit amet, \
            consectetur adipiscing elit, \
            sed do eiusmod tempor incididunt \
            ut labore et dolore magna aliqua. \
            Ut enim ad minim veniam, quis \
            nostrud exercitation ullamco \
            laboris nisi ut aliquip ex ea commodo consequat...',

}

const Comments = Array(3).fill(dummyComment);

const DidYouKnow = () => {
    return (
        <div>
            <div className="image-container">

                <div className="image-div">
                    <img src={ForumImage} className="forum-image"></img>
                </div>

            </div>

            <div className="dyk-spacer">&nbsp;</div>
            
            <a href={`/Forum`} className="did-you-know-back-button"> {"< Back"}</a>

            <div className="did-you-know-post">
                <h3>{'<'}</h3>
                <div id='bar'>&nbsp;</div>
                <div>
                    <h2>{dummyPost.title}</h2>
                    <h3>posted by Dee on {dummyPost.date}</h3>

                    <div id="image">
                        <img src={DidYouKnowImage} style={{width:"100%"}} />
                    </div>

                    <div>
                        <span>
                            <button>
                                    <Link style={{textDecoration:"none", color:"white"}} to="/DidYouKnow/">CONTENT</Link>
                            </button>
                            <button>
                                <Link style={{textDecoration:"none", color:"white"}} to="/DidYouKnow/Comments/">COMMENTS(3)</Link>
                            </button>
                        </span>
                    </div>
                    <Switch>
                        <Route exact path='/DidYouKnow/' component={DidYouKnowContent} />
                        <Route path={`/DidYouKnow/Comments/`} component={DidYouKnowComments} />
                    </Switch>
                    
                </div>
                <h3>{'>'}</h3>
            </div>
        </div>
    )
}

export default DidYouKnow;