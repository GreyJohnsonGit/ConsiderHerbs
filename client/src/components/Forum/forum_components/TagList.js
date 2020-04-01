import React, { useState, useEffect } from 'react';

const TagList = (props) => {

    const [clicked, setClicked] = useState('');
    
    useEffect(() => {
        console.log('a tag was clicked!');
        console.log(clicked);
        var filteredArr = props.tags.filter(function(item) { return item !== clicked; });
        props.setTags(filteredArr);
    }, [clicked]);

    var printedArr = props.tags.map((val) => {
        return(
            <div id='tag-text' onClick={() => setClicked(val)}> {val} </div>
        );
    });

    return <div>{printedArr}</div>   
}

export default TagList;