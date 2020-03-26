import Async from 'react-async';
import Axios from 'axios';
import React from 'react';

const loadTermInfo = () => {
    return Axios.get(
        "http://consider-herbs.herokuapp.com/api/glossary" //DEBUG ADDRESS
    )
    .then(res => {
        return res.data;
    })
    .catch(err => {
        console.error(err);
        return err;
    });
}

const TermInfo = (props) => {
    let firstLetter = '';
    let id = '';

    return(
        <div>
            <Async promiseFn={loadTermInfo}>
                {({data, err, isLoading}) => {
                    if (isLoading) return "Loading...";
                    if (err) return `Oops, something went wrong: ${err.message}`
                    if (data) {
                        return (
                            data.filter(term=>term.title.toLowerCase().includes(props.lookingFor.toLowerCase()))
                            .map((glossaryEntry) => {
                                //if(data.length <= 0){
                                  //  <b> Sorry we couldn't find the term you were looking for</b>
                                //}
                                //props.foundUp()
                                if (glossaryEntry.title.charAt(0) >= '0' && glossaryEntry.title.charAt(0) <= '9')
                                {
                                    if (firstLetter ===  '')
                                    {
                                        firstLetter = '#';
                                        id = firstLetter;
                                    }
                                }
                                else if (firstLetter !== glossaryEntry.title.charAt(0).toUpperCase())
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
                                );
                            })
                            
                        );
                        
                    }
                }}
            </Async>
        </div>
    );
}

export default TermInfo;
