import React from 'react';
import Terms from '../terms.json';

const alphabet = '#abcdefghijklmnopqrstuvwxyz'.split('');

const AlphabetList =()=>{
    return(
        <div className="alphabet-list-container">
            <div>Top</div>
            { alphabet.map((letter) => {
                return(
                    <div>
                        {letter}
                    </div>
                )
            })}
            <div>Bottom</div>
        </div>
    )
};

export default AlphabetList;