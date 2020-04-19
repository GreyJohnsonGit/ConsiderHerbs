////Events.js

import Async from 'react-async';
import Axios from 'axios';
import React from 'react';
import config from '../../config.js'

const loadEvents = async () => {
    try {
        const res = await Axios.get(config.address + '/api/Event/');
        // console.log("got events")
        return res.data;
    }
    catch (err) {
        console.error(err);
        return err;
    }
}


const EventList = (props) => {

    let deleteEvent = (Event) => {
        console.log("Event chosen to delete: ", Event)


        props.update()
    }

    return (
        <div>
            <Async promiseFn={loadEvents}>
                {({ data, err, isLoading }) => {
                    if (isLoading) return "Loading...";
                    if (err) return `Oops, something went wrong: ${err.message}`
                    // console.log("data: ", data)
                    if (data && Array.isArray(data)) {
                        return (
                            data.map((Eventy) => {
                                // console.log("fetched Date", new Date(Event.date));
                                // console.log("sent num: ", (new Date(props.date)));
                                // console.log("comp: ", new Date(Event.date).getTime() == new Date(props.date).getTime())
                                //console.log("Eventy: ",Eventy)
                                if (new Date(Eventy.date).getTime() == new Date(props.date).getTime()) {
                                    return (
                                        <div className="term-container" >
                                            <div>
                                                <h1>{Eventy.name}</h1>
                                                <button className='admin-button' onClick={() => props.editFn(Eventy)}>Edit</button>
                                                <button className='admin-button' onClick={() => {
                                                    console.log("got here1");
                                                    window.location.reload(true);
                                                    Axios.delete(
                                                        config.address + '/api/Event/' + Eventy._id,
                                                        Eventy
                                                    )
                                                        .then((res) => {
                                                            console.log("got here")
                                                        })
                                                        .catch((err) => {
                                                            console.error("This is the error I caught: ",err);
                                                        })
                                                    
                                                }}>Delete</button>
                                                <p>Type</p>
                                                <p>{Eventy.type}</p>
                                                <p>Date</p>
                                                <p>{Eventy.date}</p>
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
