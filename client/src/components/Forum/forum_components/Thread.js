import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import config from '../../../config.js'
import Async from 'react-async';
import { PromiseProvider } from 'mongoose';

/*const dummyThread = {
    threadId: 'threadId',
    userId: 'userId',
    title: 'Some Thread',
    user: '@JaneDoe',

    // eslint-disable-next-line
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
    // eslint-disable-next-line
    body: 'Lorem ipsum dolor sit amet, \
            consectetur adipiscing elit, \
            sed do eiusmod tempor incididunt \
            ut labore et dolore magna aliqua. \
            Ut enim ad minim veniam, quis \
            nostrud exercitation ullamco \
            laboris nisi ut aliquip ex ea commodo consequat...',

}*/

const formatDate = (date) => {
    //console.log(date)
    let d = new Date();
    let d2  = new Date(date);
    //console.log(d)
    //console.log(d2)
    let time_diff = d.getTime() - d2.getTime();
    //console.log(time_diff)
    //if more than 1 day difference
    let day_diff = time_diff / (1000 * 3600 * 24);
    if(day_diff > 1){
        //if years
        if(day_diff > 365){
            return (Math.floor(day_diff/365)) + " years ago"
        }
        else if(day_diff > 30){
            return (Math.floor(day_diff/30)) + " months ago"
        }
        else if(day_diff > 7){
            return (Math.floor(day_diff/7)) + " weeks ago"
        }
        else{
            return (Math.floor(day_diff)) + " days ago"
        }
    }
    else{
        let second_diff = time_diff / 1000;
        if(second_diff > 3600){
            return (Math.floor(second_diff/3600)) + " hours ago"
        }
        else if(second_diff > 60){
            return (Math.floor(second_diff/60)) + " minutes ago"
        }
        else{
            return (Math.floor(second_diff)) + " seconds ago"
        }
    }
}



const Thread = () => {

    //get thread specified in URL
    const getThread = (props) => {
        //console.log(props)
        return axios.get(config.address + '/api/Forum/' + props.thread_id)
        .then(function(res){
            console.log(res)
            return res.data
        })
        .catch(err => {
            console.error(err);
            return err;
        });
    }

    return (
        <div>
            <Async thread_id={useParams().threadId} promiseFn={getThread}>
                {(data, err, isLoading) => {
                    if (isLoading) return "Loading...";
                    if (err) return `Oops, something went wrong: ${err.message}`
                    if (data != null && data.data != null) {

                        let thread = data.data;
                        //console.log(data);

                        if(thread.replies != null){
                            return (
                                <div>
                                    <a href={`/Forum`}> {"< back"}</a>
        
                                    <div className="thread-post">
                                        <div id="main-post-side-bar">&nbsp;</div>
                                        <div id="main-post-container">
                                            <h1>{thread.title}</h1> 
                                            <h2>posted by <b>{thread.user}</b> {formatDate(thread.date)} </h2>
                                            <p>{thread.body}</p>
                                            <h3>Likes: {thread.likes} Replies: {thread.replies.length} </h3>
                                        </div>
                                    </div>
                                    {thread.replies.map((reply) => {
                                        //console.log(reply)
                                        return (
                                            <div className="thread-comment">
                                                <div id="comment-side-bar">&nbsp;</div>
                                                <div id="comment-container">
                                                    <h2><b>{reply.user}</b> commented {formatDate(reply.date)} </h2>
                                                    <p>{reply.text}</p>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            )
                        }
                        else{
                            return (
                                <div>
                                    <a href={`/Forum`}> {"< back"}</a>
                        
                                    <div className="thread-post">
                                        <div id="main-post-side-bar">&nbsp;</div>
                                        <div id="main-post-container">
                                            <h1>{thread.title}</h1> 
                                            <h2>posted by <b>{thread.user}</b> {formatDate(thread.date)} </h2>
                                            <p>{thread.body}</p>
                                            <h3>Likes: {thread.likes} Replies: 0 </h3>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                        
                    }
                }}
                
            </Async>
        </div>
    )

    
}

export default Thread;