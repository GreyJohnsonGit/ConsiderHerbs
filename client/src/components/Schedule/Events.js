////Events.js

import Async from 'react-async';
import Axios from 'axios';
import React from 'react';
import config from '../../config.js'

import { useCookies } from 'react-cookie';

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
    const [cookies,] = useCookies(['user']);

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
                                        <div  >

                                            <h2>{Eventy.name}</h2>
                                            {cookies.user.userLevel > 2 ? <button className='admin-button' onClick={() => props.editFn(Eventy)}>Edit</button> : ""}
                                            {cookies.user.userLevel > 2 ? <button className='admin-button' onClick={() => {
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
                                                        console.error("This is the error I caught: ", err);
                                                    })

                                            }}>Delete</button> : ""}
                                            <h>Type: </h>
                                            <p>{Eventy.type}</p>
                                            <h>Date: </h>
                                            <p>{Eventy.date}</p>

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
