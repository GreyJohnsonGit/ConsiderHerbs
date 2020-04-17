import React, { useState, useEffect } from 'react';

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

const DidYouKnowComments = () => {

    var printedArr = Comments.map((val) => {
        return(
            <div className="thread-comment">
                <div id="comment-side-bar" style={{margin:"0px"}}>&nbsp;</div>
                <div id="comment-container" style={{margin:"0px", width:"100%"}}>
                    <div id="title" style={{marginTop:"10px"}}><b>{val.user}</b> replied n units of time ago </div>
                    <div id="body">{val.body}</div>
                </div>
            </div>        
        );
    });

    return <div>{printedArr}</div>   
}

export default DidYouKnowComments;