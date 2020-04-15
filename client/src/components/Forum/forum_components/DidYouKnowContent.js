import React, { useState, useEffect } from 'react';

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

const DidYouKnowContent = () => {
    return (
        <div>
            <p>{dummyPost.body}</p>
            { dummyPost.sources.map((source) => {
                return (
                    <div>
                        <p id="source">{source}</p>
                    </div>
                )
            })}
        </div>
    );

}

export default DidYouKnowContent;