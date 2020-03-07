import React from 'react';
import Terms from '../terms.json';


const TermInfo =()=>{
    return(
        <div>
            { Terms.map((glossaryEntry)=>{
                return(
                    <div className="term-container" >
                        <p>{glossaryEntry.title}</p>
                        <div>
                            <p> Definition: {glossaryEntry.definition}</p>
                        </div>
                        <div>
                            <p> Usage: {glossaryEntry.usage}</p>
                        </div>
                        
                    </div>
                )
            })}
        </div>
    );
}

export default TermInfo;