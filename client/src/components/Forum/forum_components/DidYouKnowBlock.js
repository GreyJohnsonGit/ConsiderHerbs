import React from 'react';

const dummyDYK = {
    title: 'Title',
    body: 'Lorem ipsum dolor sit amet, \
            consectetur adipiscing elit, \
            sed do eiusmod tempor incididunt \
            ut labore et dolore magna aliqua. \
            Ut enim ad minim veniam, quis \
            nostrud exercitation ullamco \
            laboris nisi ut aliquip ex ea commodo consequat...',
}

const DYK = Array(3).fill(dummyDYK);

const DidYouKnow = () => {
    return (
        <div className='dyk-block-container'>
            { DYK.map((post) => {
                <div className='dyk-spacer'></div>
            })}
        </div>
    )
}
