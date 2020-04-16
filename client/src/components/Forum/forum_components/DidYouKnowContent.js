import React, { useState, useEffect } from 'react';

const DidYouKnowContent = (props) => {
    return (
        <div>
            <p style={{whiteSpace: "pre-wrap"}}>{props.didYouKnowEntry.body}</p>
            <p id="source">{props.didYouKnowEntry.sources}</p>
        </div>
    );

}

export default DidYouKnowContent;