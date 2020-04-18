import './Schedule.css';
import React, { useState } from 'react';
import Required from './Required.png'; //temporary until I have the schedule image 
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

const Schedule = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [mode, setMode] = useState('');

    // const[name, setName] = useState('')
    // const[type, setType] = useState('')
    // const[date, setDate] = useState('')
    // const[start_time]

    const toggleShowPopup = () => {
        setShowPopup(!showPopup);
    };

    const editEvent = (entry) => {
        event = entry;
        setMode('edit');
        toggleShowPopup();
    };
    const newEvent = () => {
        event = {
            name: "",
            type: "",
            date: "",
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
            axios.put(
                config.address + '/api/Event/' + event.name,
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


    return (
        <div>
            <div classname='image-container'>

                <div className="sch-image-div">   <img alt="Schedule" src={Required} className="background-image"></img></div>

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
                    <DatePicker selected={event.date} onSelect={val => { event.date = val}} />

                    <label htmlFor='time1'>start_time</label>
                    <textarea rows='1' id='time1' defaultValue={event.start_time} onChange={val => { event.start_time = val.target.value }} />

                    <label htmlFor='time2'>end_time</label>
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
            <Calendar />
            <button onClick={newEvent}>New Event</button>

            <button onClick={console.log("sur")}>Request Personal Consultation</button>

        </div>

    );
}

export default Schedule;