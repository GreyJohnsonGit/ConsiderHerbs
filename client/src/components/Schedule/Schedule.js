import './Schedule.css';
import React from 'react';
import Basket from './Basket.png'
import Calandar from './Calandar'

const Schedule =()=>{
    return(
        <div classname='image-container'> 
            
            <div className="sch-image-div">   <img src={Basket} className="background-image"></img></div>

            <div className="sch-centered-title"><span>Because We Value Human Connection</span></div>

            <div className="sch-below-title"><span>It's just natural!</span></div>
            
            <div className="sch-below-2"><span>Schedule a consultation today!</span></div>

            <Calandar/>

        </div>
       
    );
}


export default Schedule;

