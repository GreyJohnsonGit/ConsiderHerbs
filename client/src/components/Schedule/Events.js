import Async from 'react-async';
import Axios from 'axios';
import React from 'react';

const loadEvents = () => {
    return Axios.get(
        "https://consider-herbs.herokuapp.com/api/Events" //DEBUG ADDRESS
    )
    .then(res => {
        return res.data;
    })
    .catch(err => {
        console.error(err);
        return err;
    });
}

const EventList = (props) => {
    let firstLetter = '';
    let id = '';

    return(
        <div>
            <Async promiseFn={loadEvents}>
                {({data, err, isLoading}) => {
                    if (isLoading) return "Loading...";
                    if (err) return `Oops, something went wrong: ${err.message}`
                    if (data && Array.isArray(data)) {
                        return (
                            data.filter(term=>term.title.toLowerCase().includes(props.lookingFor.toLowerCase()))
                            .map((Event) => {
                                //if(data.length <= 0){
                                  //  <b> Sorry we couldn't find the term you were looking for</b>
                                //}
                                //props.foundUp()
                                if (Event.title.charAt(0) >= '0' && Event.title.charAt(0) <= '9')
                                {
                                    if (firstLetter ===  '')
                                    {
                                        firstLetter = '#';
                                        id = firstLetter;
                                    }
                                }
                                else if (firstLetter !== Event.title.charAt(0).toUpperCase())
                                {
                                    firstLetter = Event.title.charAt(0).toUpperCase();
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
                                            <h1>{Event.title}</h1>
                                            <button className='admin-button' onClick={() => props.editFn(Event)}>Edit</button>
                                            <button className='admin-button'>Delete</button>
                                            <table>
                                                <tr>
                                                    <th>Definition</th>
                                                    <td>{Event.definition}</td>
                                                </tr>
                                                <tr>
                                                    <th>Usage</th>
                                                    <td>{Event.usage}</td>
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

export default EventList;
