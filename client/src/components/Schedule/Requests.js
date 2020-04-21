////Events.js

import Async from 'react-async';
import Axios from 'axios';
import React from 'react';
import config from '../../config.js'

const loadRequests = async () => {
    try {
        const res = await Axios.get(config.address + '/api/Meeting/');
        // console.log("got events")
        return res.data;
    }
    catch (err) {
        console.error(err);
        return err;
    }
}


const ReqList = () => {

    return (
        <div>
            <Async promiseFn={loadRequests}>
                {({ data, err, isLoading }) => {
                    if (isLoading) return "Loading...";
                    if (err) return `Oops, something went wrong: ${err.message}`
                    console.log("data: ", data)
                    if (data && Array.isArray(data)) {
                        return (
                            data.map((Eventy) => {
                                
                                return (
                                    <div>
                                        <h2>{Eventy.name}</h2>
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
                                                    console.error("This is the error I caught: ", err);
                                                })

                                        }}> Delete</button>

                                        <h>Type: </h>
                                        <p>{Eventy.type}</p>
                                        <h>Date: </h>
                                        <p>{Eventy.date}</p>

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

export default ReqList;
