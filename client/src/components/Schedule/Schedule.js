import './Schedule.css';
import React from 'react';
import ScheduleImage from './ScheduleImage.jpg'; //temporary until I have the schedule image 


const Schedule =()=>{
    return(
        <div classname='image-container'> 
            
            <div className="sch-image-div">   <img src={ScheduleImage} className="background-image"></img></div>

            <div className="sch-centered-title"><span>Because We Value Human Connection.</span></div>

            <div className="sch-below-title"><span>It's just natural!</span></div>
            
            <div>Admin tools here (being able to see the bookings)</div>

           
        </div>
        
    );
}

export default Schedule;