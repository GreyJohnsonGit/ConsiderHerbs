//////////Calandar

import React, { useState } from 'react';
import Events from './Events.js'

const Calendar = (props) => {
    // const DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    // const DAYS_LEAP = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    const [render, forceRender] = useState(0);

    const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

    let today = new Date(new Date().setHours(0, 0, 0, 0));



    let DAYS_OF_THE_WEEK = [
        {
            day: 'SUN',
            num: 0,
            date: '',
        },
        {
            day: 'MON',
            num: 1,
            date: '',
        },
        {
            day: 'TUE',
            num: 2,
            date: '',
        },
        {
            day: 'WED',
            num: 3,
            date: '',
        },
        {
            day: 'THU',
            num: 4,
            date: '',
        },
        {
            day: 'FRI',
            num: 5,
            date: '',
        },
        {
            day: 'SAT',
            num: 6,
            date: '',
        },
    ];

    const [daysstate, setDays] = useState([])

    let update  = () =>{
        setDays(daysstate)
        forceRender(render+1);
    }

    let initDates = () => {
        console.log("render:", render)
        if (render === 0) {
            DAYS_OF_THE_WEEK.forEach(element => {
                element.date = new Date(today.getTime() + (element.num - today.getDay()) * 24 * 60 * 60 * 1000).getTime();
            })

            setDays(DAYS_OF_THE_WEEK)
            forceRender(render+1);
            console.log("Days of week after init: ", DAYS_OF_THE_WEEK)
        }
    }
    let nextWeek = () => {
        console.log("nweek")
        daysstate.forEach(element => {
            element.date = new Date(new Date(element.date).getTime() + (7 * 24 * 60 * 60 * 1000)).getTime();
        })
        setDays(daysstate)
       forceRender(render+1);
    }

    let lastWeek = () => {
        console.log("lweek")
        console.log("Daystate before: ", daysstate)
        daysstate.forEach(element => {
            element.date = new Date(new Date(element.date).getTime() - (7 * 24 * 60 * 60 * 1000)).getTime();
        })

        setDays(daysstate)
        forceRender(render+1);
    }

    // let isLeapYear = (year) => {
    //     return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    // }
    // let days = isLeapYear ? DAYS_LEAP : DAYS;

    return (
        <div className="calendar">
            <div className="calendarHeader">
                <button className="changeWeek" onClick={lastWeek}> Last Week </button>
                <h1 className="CalandarTitle">{MONTHS[today.getMonth()]}</h1>
                <button className="changeWeek" onClick={nextWeek}> Next Week </button>
            </div>

            {initDates()}
            {
                daysstate.map(day => {
                    return (
                        <div className="dayCol">
                            <h2 className="dayLabel">{day.day}</h2>
                            <p>{new Date(day.date).getDate()}</p>
                            <Events className="EventinCol" date={day.date} update={update} editFn={props.editEvent}/>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Calendar;

