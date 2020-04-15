import React, { useState, useEffect } from 'react';
import Events from './Events.js'

const calandar = (props) => {
    const DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const DAYS_LEAP = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const DAYS_OF_THE_WEEK = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
    const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];


    let isLeapYear = (year) => {
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    }
    let days = isLeapYear ? DAYS_LEAP : DAYS;

    return (
        <div className = "calendar">
            <div className = "lastWeek">  </div>
            <h1 className="CalandarTitle">Events</h1>
            {DAYS_OF_THE_WEEK.map(day => {
                return (
                    <div className="dayCol">
                        <h2 className="dayLabel">{day}</h2>

                        <Events className= "EventinCol" day = {day}/>
                    </div>
                )
            })
            }
        </div>
    )
}

export default calandar;