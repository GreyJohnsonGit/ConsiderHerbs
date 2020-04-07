import React from 'react';
import DidYouKnowImage from './assets/Did_You_Know_IMG.jpg';

const dummyPost = {
    postId: 'postId',
    title: 'Some Post',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat...',
    replies: []
}

const Posts = Array(3).fill(dummyPost);

const DidYouKnowPreview = () => {
    return (
        <div className='did-you-know-container'>
            { Posts.map((post) => {
                return (
                    <div className='post-container'>
                        <div className='post-spacer'></div>
                        <div className='post-content'>
                            <div style={{position:'relative', overflow:'hidden', width:'100%', height:"110px"}}>
                                <img src={DidYouKnowImage} style={{width:"100%"}} />
                            </div>
                            <a href={`/DidYouKnow`}>{post.title}</a>
                            <p>{post.body}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    )
}

export default DidYouKnowPreview;