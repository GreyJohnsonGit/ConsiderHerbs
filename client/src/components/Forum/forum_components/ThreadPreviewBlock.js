import React, {useState} from 'react';
import axios from 'axios';
import config from '../../../config.js'
import Async from 'react-async';

const dummyThread = {
    threadId: 'threadId',
    userId: 'userId',
    title: 'Some Thread',
    user: '@JaneDoe',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat...',
    likes: 0,
    replies: []
}

const loadThreads = () => {
    return axios.get(config.address + '/api/Forum')
    .then(function(res){
        return res.data
    })
    .catch(err => {
        console.error(err);
        return err;
    });
}

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

const ThreadPreviewBlock = (props) => {
    const [count,setCount] = useState(2);

    const renderHeader = () => {
        if(props.type == "search" && props.filterText != ""){
        return (<h3 style={{color: "black"}}>Threads about "{props.filterText}"</h3>)
        }
    }

    //console.log("TPB: " + props.type);
    
    return (
        <div>
        <Async promiseFn={loadThreads}>
            {({data, err, isLoading}) => {
                //console.log(data)
                //console.log(err)
                //console.log(isLoading)
                
                if (isLoading && props.type != "search") return "Loading...";
                if (err) return `Oops, something went wrong: ${err.message}`
                if (data && Array.isArray(data)) {
                    let ThreadList = data;

                    //sort
                    if(props.type == "popular"){
                        ThreadList.sort((a,b) => (a.likes > b.likes) ? -1 : 1);
                        //console.log(ThreadList)
                    }
                    else if(props.type == "latest" || props.type == "search"){
                        ThreadList.sort((a,b) => (new Date(a.date) > new Date(b.date)) ? -1 : 1);
                        console.log(ThreadList)
                    }

                    if(props.type == "search"){

                        //filter threads by title, body, and tags
                        let filterText = props.filterText.toLowerCase();
                        if(filterText == ""){
                            return;
                        }
                        else{
                            ThreadList = ThreadList.filter(function(thread) {
                                return thread.title.toLowerCase().includes(filterText) || thread.body.toLowerCase().includes(filterText) || (thread.tags.filter((tag) => {return tag.toLowerCase().includes(filterText)}).length != 0)
                            })
                        }

                        //show 10 inital search results
                        setCount(10);

                    }


                    //limit count
                    ThreadList = ThreadList.slice(0, count);
                    //console.log(ThreadList[0]._id)

                    return (
                        <div>
                            <div>{renderHeader()}</div>
                            <div className='thread-preview-block-container'>
                                { ThreadList.map((thread) => {
                                    return (
                                        <div>
                                            <div>
                                                <a className='thread-preview-title' href={`/Forum/${thread._id}`}>{thread.title}</a> - <i>posted by <b>{thread.user}</b> {formatDate(thread.date)} -</i>
                                                <span id='thread-preview-likes-replies'>
                                                    Likes: {thread.likes} Replies: {thread.replies.length}
                                                </span>
                                            </div>
                                            <p className='thread-preview-body'>
                                                {thread.body}
                                            </p>
                                        </div>
                                    )
                                })}
                                {/*eslint-disable-next-line*/}
                                <a onClick={() => setCount(count + 2)} className='thread-preview-block-link'>See More...</a>
                            </div>
                        </div>
                    )
                    

                    
                }
            }}
        </Async>
        </div>
    )
}

export default ThreadPreviewBlock;