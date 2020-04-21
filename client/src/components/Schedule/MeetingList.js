import React from 'react'
import Async from 'react-async';
import Axios from 'axios';
import config from '../../config.js'

const getMeetings= async ()=>{
    const res = await Axios.get(config.address + '/api/Meeting/');
    return res.data;
}


const MeetingList =()=>{

   
    return(
        <div>
            <h2> List of Consultations </h2>
            <Async promiseFn={getMeetings} >
            {({ data, err, isLoading }) => {
                    if (isLoading) return "Loading...";
                    if (err) return `Oops, something went wrong: ${err.message}`
                    // console.log("data: ", data)
                    if (data && Array.isArray(data)) {
                        return (
                            data.map((meeting) => {
                                //if (new Date(Eventy.date).getTime() == new Date(props.date).getTime()) {
                                    return (
                                        <div className="term-container" >
                                            <div>
                                                <h2>{meeting.name}</h2>    
                                                <button className='admin-button' onClick={() => {
                                                    console.log("got here1");
                                                    window.location.reload(true);
                                                    Axios.delete(
                                                        config.address + '/api/Event/' + meeting._id,
                                                        meeting
                                                    )
                                                        .then((res) => {
                                                            console.log("got here")
                                                        })
                                                        .catch((err) => {
                                                            console.error("This is the error I caught: ",err);
                                                        })
                                                    
                                                }}>Deny Request</button>
                                                <button> Accept Request </button>
                                            </div>
                                        </div>
                                    );
                               // }
                            })

                        );

                    }
                }}
            </Async>

        </div>
        
        
       
    );

}

export default MeetingList;