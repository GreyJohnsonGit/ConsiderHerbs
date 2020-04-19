import './Schedule.css';
import React, { useState } from 'react';
import RoseImage from './rose.png'; //temporary until I have the schedule image 
import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import config from '../../config.js'
import Calendar from './Calendar'
import AdminPopUp from "../Admin/AdminPopup";


let event = {
    name: "",
    type: "",
    date: new Date(),
    start_time: "",
    end_time: "",
    max_participants: "",
    current_participants: "",
    price: "",
    description: ""
}

//need to pass down the list of requests from the database and be able to delete 
let personalReq={
    name: "",
    type: "",
    date: new Date(),
    start_time: "",
    end_time: "",
    description: "",
    email:""
}


const Schedule = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [showPop2, setShowPop2]= useState(false);
    const [mode, setMode] = useState('');
   

   
    const [startDate, setStartDate] = useState(new Date());
    const [eventStartDate, setEventStartDate] = useState(new Date());

    
    const toggleShowPopup = () => {
        setShowPopup(!showPopup);        
    };

    const toggleShowPop2=()=>{
        setShowPop2(!showPop2);

    }

    const editEvent = (entry) => {
        console.log("trying to edit1: ", entry.name)
        event = entry;
  
        setMode('edit');
        toggleShowPopup();
    };
    const newEvent = () => {
        event = {
            name: "",
            type: "",
            date: new Date(),
            start_time: "",
            end_time: "",
            max_participants: "",
            current_participants: "",
            price: "",
            description: ""
        }
        setMode('new');
        toggleShowPopup();
    }

    const submitForm = () => {
        console.log(event);
        if (mode === 'edit') {
            console.log("trying to edit", event)
            axios.put(
                config.address + '/api/Event/' + event._id,
                event
            )
                .then((res) => {
                    console.log(res);
                    toggleShowPopup();
                })
                .catch((err) => {
                    console.error(err);
                    toggleShowPopup();
                })
        }
        if (mode === 'new') {
            axios.post(
                config.address + '/api/Event/',
                event
            )
                .then((res) => {
                    console.log(res);
                    toggleShowPopup();
                })
                .catch((err) => {
                    console.error(err);
                    toggleShowPopup();
                })
        }
    }

    const RequestCons =()=>{
        toggleShowPop2();
        console.log("This handles the click")


    }

    return (
        <div>
            <div classname='image-container'>

                <div className="sch-image-div">   <img alt="Schedule" src={RoseImage} className="background-image"></img></div>

                <span className="sch-centered-title">Because We Value Human Connection.</span>

                <span className="sch-below-title">It's just natural!</span>
            </div>
            <AdminPopUp closeFn={toggleShowPopup} showPopup={showPopup}>
                <form onSubmit={submitForm}>
                    <label htmlFor='name'>Name</label>
                    <input type='text' id='name' defaultValue={event.name} onChange={val => { event.name = val.target.value }} />

                    <label htmlFor='type'>Type</label>
                    <textarea rows='1' id='type' defaultValue={event.type} onChange={val => { event.type = val.target.value }} />

                    <label htmlFor='date'>Date</label>
                    <DatePicker selected={eventStartDate} 
                    onChange={(value)=>{
                        setEventStartDate(value)
                        event.date=value }} />

                    <label htmlFor='time1'>Start time</label>
                    <textarea rows='1' id='time1' defaultValue={event.start_time} onChange={val => { event.start_time = val.target.value }} />

                    <label htmlFor='time2'>End time</label>
                    <textarea rows='1' id='time2' defaultValue={event.end_time} onChange={val => { event.end_time = val.target.value }} />

                    <label htmlFor='maxp'>Max Participants</label>
                    <textarea rows='1' id='maxp' defaultValue={event.max_participants} onChange={val => { event.max_participants = val.target.value }} />

                    <label htmlFor='price'>Price</label>
                    <textarea rows='1' id='price' defaultValue={event.price} onChange={val => { event.price = val.target.value }} />

                    <label htmlFor='descip'>Description</label>
                    <textarea rows='1' id='descrip' defaultValue={event.description} onChange={val => { event.description = val.target.value }} />

                    <button type='submit'>Submit</button>
                </form>
            </AdminPopUp>
            <Calendar editEvent={editEvent} />
            <button onClick={newEvent}>New Event</button>
            
            <AdminPopUp closeFn={toggleShowPop2} showPopup={showPop2}>
                <form>
                    <label htmlfor="name">Name</label>
                    <input type="text" onChange={ (event)=>{personalReq.name=event.target.value}}></input>
                    {console.log(personalReq.name)}
                    <label>Email address</label>
                    <textarea rows="1" type="text" onChange={ (event)=>{personalReq.email=event.target.value}}></textarea>
                    <label>Consulation Type</label>
                    <textarea rows="1" type="text" placeholder="In-person or online"></textarea>
                    <label htmlFor='date'>Date</label>
                    
                    <DatePicker selected={startDate}  onChange={(date) => {
                        setStartDate(date) 
                        personalReq.start_time=startDate}} />
                                       
                    <label> Start Time</label>
                    <textarea rows="1" type="text" onChange={(time)=>{personalReq.start_time=time}}></textarea>
                    <label> End Time</label>
                    <textarea rows="1" type="text" onChange={(time)=>{personalReq.end_time=time}}></textarea>
                   
                    { /*
                    //issue with datePicker when it is inside the form
                    */}
                    <label>Description</label>
                    <textarea rows="1" placeholder="Briefly describe your goals for this consultation" 
                    onChange={(descrip)=>{personalReq.description=descrip}}></textarea>
                    
                    <button type='submit'>Submit</button>
                </form>

            </AdminPopUp>
            <button onClick={RequestCons}>Request Personal Consultation</button>

            <h1> List of requests </h1>


        </div>

    );
}

export default Schedule;