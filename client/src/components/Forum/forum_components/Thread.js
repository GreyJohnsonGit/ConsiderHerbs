import React from 'react';
//import { useParams } from 'react-router-dom';

const dummyThread = {
    threadId: 'threadId',
    userId: 'userId',
    title: 'Some Thread',
    user: '@JaneDoe',

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
    likes: 0,
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

const Thread = () => {
    //let {threadId} = useParams();

    return (
        <div>
            <a href={`/Forum`}> {"< back"}</a>

            <div className="thread-post">
                <div id="main-post-side-bar">&nbsp;</div>
                <div id="main-post-container">
                    <h1>{dummyThread.title}</h1> 
                    <h2>posted by <b>{dummyThread.user}</b> n units of time ago </h2>
                    <p>{dummyThread.body}</p>
                    <h3>Likes: {dummyThread.likes} Replies: {dummyThread.replies.length} </h3>
                </div>
            </div>

            <div className="thread-comment">
                <div id="comment-side-bar">&nbsp;</div>
                <div id="comment-container">
                    <h2><b>{dummyComment.user}</b> commented n units of time ago </h2>
                    <p>{dummyComment.body}</p>
                </div>
            </div>

            <div className="thread-comment">
                <div id="comment-side-bar">&nbsp;</div>
                <div id="comment-container">
                    <h2><b>{dummyComment.user}</b> commented n units of time ago </h2>
                    <p>{dummyComment.body}</p>
                </div>
            </div>
        </div>
    )
}

export default Thread;