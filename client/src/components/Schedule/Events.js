////Events.js

import Async from 'react-async';
import Axios from 'axios';
import React from 'react';
import config from '../../config.js'

const loadEvents = async () => {
    try {
        const res = await Axios.get(config.address + '/api/Event/');
        console.log("got events")
        return res.data;
    }
    catch (err) {
        console.error(err);
        return err;
    }
}


const EventList = (props) => {
    let firstLetter = '';
    let id = '';

    return (
        <div>
            <Async promiseFn={loadEvents}>
                {({ data, err, isLoading }) => {
                    if (isLoading) return "Loading...";
                    if (err) return `Oops, something went wrong: ${err.message}`
                    console.log("data: ", data)
                    if (data && Array.isArray(data)) {
                        return (
                            data.map((Event) => {
                                console.log("fetched Date", new Date(Event.date).getDay());
                                console.log("sent num: ", (props.day));
                                if (new Date(Event.date).getDay() === (props.day)) {
                                    return (
                                        <div className="term-container" id={id}>
                                            <div>
                                                <h1>{Event.name}</h1>
                                                <button className='admin-button' onClick={() => props.editFn(Event)}>Edit</button>
                                                <button className='admin-button'>Delete</button>
                                                <p>Type</p>
                                                <p>{Event.type}</p>
                                                <p>Date</p>
                                                <p>{Event.date}</p>
                                            </div>
                                        </div>
                                    );
                                }
                            })

                        );

                    }
                }}
            </Async>
        </div>
    );
}

export default EventList;
