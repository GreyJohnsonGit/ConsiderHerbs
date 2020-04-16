import React from 'react';
import Async from 'react-async';
import Axios from 'axios';
import DidYouKnowImage from './assets/Did_You_Know_IMG.jpg';
import config from '../../../config.js';


const dummyPost = {
    postId: 'postId',
    title: 'Some Post',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat...',
    replies: []
}

const Posts = Array(3).fill(dummyPost);

const loadPostInfo = () => {
    return Axios.get(
        config.address + '/api/DidYouKnow/'
    )
    .then(res => {
        return res.data;
    })
    .catch(err => {
        console.error(err);
        return err;
    });
}

const DidYouKnowPreview = (props) => {
    return (
        <div className='did-you-know-container'>
            <Async promiseFn={loadPostInfo}>
                {({data, err, isLoading}) => {
                    if (isLoading) return "Loading...";
                    if (err) return `Oops, something went wrong: ${err.message}`
                    if (data && Array.isArray(data)) {
                        return (
                            data.map((didYouKnowEntry) => {
                                return (
                                    <div className='post-container'>
                                        <div className='post-spacer'></div>
                                        <div className='post-content'>
                                            <div style={{position:'relative', overflow:'hidden', width:'100%', height:"110px"}}>
                                                <img src={DidYouKnowImage} style={{width:"100%"}} />
                                            </div>
                                            <a href={`/DidYouKnow`}>{didYouKnowEntry.title}</a>
                                            <p>{didYouKnowEntry.body}</p>
                                        </div>
                                    </div>
                                );
                            })
                        );
                    }
                }}
            </Async>
        </div>
    )
}

export default DidYouKnowPreview;