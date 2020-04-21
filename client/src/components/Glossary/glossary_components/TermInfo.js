import Async from 'react-async';
import Axios from 'axios';
import React, {useState} from 'react';
import config from '../../../config.js'

const loadTermInfo = () => {
    return Axios.get(
        config.address + '/api/glossary'
    )
    .then(res => {
        console.log(res);
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
                    if (data && Array.isArray(data)) {
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
                                        <div className="term-info-container">
                                            <h1>{glossaryEntry.title}</h1>
                                            { props.userLevel >= 3 ?
                                                <form>
                                                    <button type='button' className='admin-button' onClick={() => props.editFn(glossaryEntry)}>Edit</button>
                                                    <button type='submit' className='admin-button' onClick={(event) => {
                                                        Axios.delete(
                                                            config.address + '/api/Glossary/' + glossaryEntry.title
                                                        )
                                                        .then((res) => {
                                                            window.location.reload();
                                                        })
                                                        .catch((err) => {
                                                            console.error(err);
                                                        })
                                                    }}>
                                                    Delete
                                                    </button>
                                                    </form>
                                            : null }
                                            { props.userLevel >= glossaryEntry.userLevel ? 
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
                                            : <table><tr><th></th><td>Subscribe to View This Content!</td></tr></table> }
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
