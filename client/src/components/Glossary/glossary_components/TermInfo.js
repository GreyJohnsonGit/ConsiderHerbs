import React from 'react';
import Terms from '../terms.json';


const TermInfo =()=>{
    return(
        <div>
            { Terms.map((glossaryEntry)=>{
                return(
                    <div className="term-container" >
                        <h1>{glossaryEntry.title}</h1>
                        <table>
                            <tr>
                                <th>Definition</th>
                                <td>{glossaryEntry.definition}</td>
                            </tr>
                            <tr>
                                <th>Usage</th>
                                <td>{glossaryEntry.usage}</td>
                            </tr>
                        </table>
                    </div>
                )
            })}
        </div>
    );
}

export default TermInfo;