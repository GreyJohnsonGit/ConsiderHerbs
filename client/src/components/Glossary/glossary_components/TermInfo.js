import React from 'react';
import Terms from '../terms.json';


const TermInfo =()=>{
    let firstLetter = '';
    let id = '';

    return(
        <div>
            { Terms.map((glossaryEntry) => {
                if (glossaryEntry.title.charAt(0) >= '0' && glossaryEntry.title.charAt(0) <= '9')
                {
                    if (firstLetter ==  '')
                    {
                        firstLetter = '#';
                        id = firstLetter;
                    }
                }
                else if (firstLetter != glossaryEntry.title.charAt(0).toUpperCase())
                {
                    firstLetter = glossaryEntry.title.charAt(0).toUpperCase();
                    id = firstLetter;
                }
                else
                {
                    id = '';
                }

                return(
                    <div className="term-container" id={id}>
                        <div className="large-letter">
                            {id}
                        </div>
                        <div>
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
                    </div>
                )
            })}
        </div>
    );
}

export default TermInfo;