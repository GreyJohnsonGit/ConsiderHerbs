import './Schedule.css';
import React from 'react';
import Basket from './Basket.png'


const Schedule =()=>{
    return(
        <div classname='image-container'> 
            
            <div className="sch-image-div">   <img src={Basket} className="background-image"></img></div>

            <div className="sch-centered-title"><span>Because We Value Human Connection</span></div>

            <div className="sch-below-title"><span>It's just natural!</span></div>
            
            <div className="sch-below-2"><span>Schedule a consultation today!</span></div>
            
           
            <iframe src="https://calendar.google.com/calendar/embed?height=600&amp;wkst=1&amp;bgcolor=%23d7f09c&amp;ctz=America%2FNew_York&amp;src=b2xnYWRhbmllbGFjQGdtYWlsLmNvbQ&amp;src=dGJzODU2NmxkbDRwdjUxbzUwb2lmN3U5b2tAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&amp;src=YWRkcmVzc2Jvb2sjY29udGFjdHNAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&amp;src=ZW4udXNhI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&amp;color=%237986CB&amp;color=%237986CB&amp;color=%2333B679&amp;color=%230B8043" width="800" height="600" frameborder="0" scrolling="no"></iframe>            
        
        </div>
       
    );
}

export default Schedule;

