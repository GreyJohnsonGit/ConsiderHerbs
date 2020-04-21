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
            <div className='meeting-title' >List of Consulations </div>
            <Async promiseFn={loadRequests}>
                {({ data, err, isLoading }) => {
                    if (isLoading) return "Loading...";
                    if (err) return `Oops, something went wrong: ${err.message}`
                    console.log("data: ", data)
                    if (data && Array.isArray(data)) {
                        return (
                            data.map((meeting) => {
                                
                                return (
                                    <div>
                                        <div className='meeting-item-spacer'></div>                                        
                                        <div className='meeting-item'>
                                            <h4>Client: {meeting.name}</h4>
                                            <div>
                                            <button className='admin-button' onClick={() => {
                                                console.log("got here1");
                                                window.location.reload(true);
                                                Axios.delete(
                                                    config.address + '/api/Meeting/' + meeting._id,
                                                    meeting
                                                )
                                                    .then((res) => {
                                                        console.log("got here")
                                                    })
                                                    .catch((err) => {
                                                        console.error("This is the error I caught: ", err);
                                                    })

                                            }}> Deny </button>

                                            <button className='admin-button'>Accept </button>
                                            </div>
                                            {console.log(meeting)}
                                            <tr>
                                                <th>Type: </th> 
                                                <td>{meeting.type}</td>
                                                  
                                            </tr>
                                            <tr>
                                                <th>Date: </th> 
                                                <td>{meeting.date}</td>
                                            </tr>
                                            <tr>
                                                <th>Start: </th> 
                                                <td>{meeting.start_time}</td>
                                                <th>End: </th> 
                                                <td>{meeting.end_time}</td>
                                            </tr>
                                            <tr>
                                                <th>Description: </th> 
                                                <td>{meeting.description}</td>
                                            </tr>
                                            <tr>
                                                <th>Contact Information: </th> 
                                                <td>{meeting.description}</td>
                                            </tr>  
                                                                                      
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

export default ReqList;
