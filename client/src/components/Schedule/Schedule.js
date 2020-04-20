import './Schedule.css';
import React, { useState } from 'react';
import RoseImage from './rose.png'; //temporary until I have the schedule image 
import axios from 'axios';
import {useCookies} from 'react-cookie';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import MeetingList from './MeetingList.js'
import config from '../../config.js'
import Calendar from './Calendar'
import AdminPopUp from "../Admin/AdminPopup";
import Requests from './Requests'


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
    const [cookies, ] = useCookies(['user']);
   

   
    const [startDate, setStartDate] = useState(new Date()); //sets the date in the DatePicker for Meeting request
    const [eventStartDate, setEventStartDate] = useState(new Date()); // same^ but for NewEvent form

    
    const toggleShowPopup = () => {
        setShowPopup(!showPopup);        
    };

    const toggleShowPop2=()=>{
        setShowPop2(!showPop2);
    };

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
            console.log("trying to post", event)
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
        personalReq={
            name: "",
            type: "",
            date: new Date(),
            start_time: "",
            end_time: "",
            description: "",
            email:""
        }
        toggleShowPop2();
    }

    const addMeeting = () => {
        //param.preventDefault() 
        console.log("meeting being added: ", personalReq);
        axios.post(
            config.address + '/api/Meeting/',
            personalReq
        )
        .then((res) => {
            console.log(res);
            //toggleShowPop2();
        })
        .catch((err) => {
            console.error(err);
            //toggleShowPop2();
        })

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

                    <button type='submit' id="admin-button">Submit</button>
                </form>
            </AdminPopUp>
            <Calendar editEvent={editEvent} />
            <Requests />

            {console.log("user : ", cookies)}
            {cookies.user.userLevel > 2?<button onClick={newEvent}>New Event</button>: ""}
            
            <AdminPopUp closeFn={toggleShowPop2} showPopup={showPop2}>
                <form onSubmit={addMeeting}> 
                    <label htmlFor="name">Name</label>
                    <input type="text" onChange={ (event)=>{personalReq.name=event.target.value}}></input>
                    {console.log(personalReq.name)}
                    <label>Email address</label>
                    <textarea rows="1" type="text" onChange={ (event)=>{personalReq.email=event.target.value}}></textarea>
                    <label>Consulation Type</label>
                    <textarea rows="1" type="text" placeholder="In-person or online" onChange={ (event)=>{personalReq.type=event.target.value}}></textarea>
                    <label htmlFor='date'>Date</label>
                    
                    <DatePicker selected={startDate}  onChange={(date) => {
                        setStartDate(date) 
                        personalReq.start_time=startDate}} />
                                       
                    <label> Start Time</label>
                    <textarea rows="1" type="text" onChange={(event)=>{personalReq.start_time=event.target.value}}></textarea>
                    <label> End Time</label>
                    <textarea rows="1" type="text" onChange={(event)=>{personalReq.end_time=event.target.value}}></textarea>
                   
                    { /*
                    //issue with datePicker when it is inside the form
                    */}
                    <label>Description</label>
                    <textarea rows="1" placeholder="Briefly describe your goals for this consultation" 
                    onChange={(descrip)=>{personalReq.description=descrip}}></textarea>
                    
                    <button type='submit' id="admin-button" >Submit</button>
                </form>

            </AdminPopUp>
            <button onClick={RequestCons} >Request Personal Consultation</button>

            {cookies.user.userLevel > 2?<MeetingList/>:""}


        </div>

    );
}

export default Schedule;