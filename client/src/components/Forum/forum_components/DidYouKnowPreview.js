import React from 'react';

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

                            <img src='http://picsum.photos/330/100' style={{width:'100%',height:'auto'}}/>
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