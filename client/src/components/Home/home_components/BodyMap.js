import React, { useState, useEffect } from 'react';
import Male_Frontp from './MaleBody.js';
import Female_Frontp from './FemaleBody.js';
import Neutral_Front from './images/Neutral_Front.png';

//import F_Selected from './images/F_Selected.png';
import F_Unselected from './images/F_Unselected.png';
//import M_Selected from './images/M_Selected.png';
import M_Unselected from './images/M_Unselected.png';
//import { set } from 'mongoose';

import FF from './images/Female_Front.png';
import FFC from './images/Female_Front_Colored.png';
import FB from './images/Female_Back.png';
import FBC from './images/Female_Back_Colored.png';

import MF from './images/Male_Front.png';
import MFC from './images/Male_Front_Colored.png';
import MB from './images/Male_Back.png';
import MBC from './images/Male_Back_Colored.png';


const BodyMap = (props) => {

   let Male_Front = <Male_Frontp image = {MF} setFilterText = {props.setFilterText} />
   let Male_Back = <Male_Frontp image = {MB} setFilterText = {props.setFilterText} />
   let Male_Front_Colored = <Male_Frontp image = {MFC} setFilterText = {props.setFilterText} />
   let Male_Back_Colored = <Male_Frontp image = {MBC} setFilterText = {props.setFilterText} />

   let Female_Front = <Female_Frontp image = {FF} setFilterText = {props.setFilterText} />
   let Female_Back = <Female_Frontp image = {FB} setFilterText = {props.setFilterText} />
   let Female_Front_Colored = <Female_Frontp image = {FFC} setFilterText = {props.setFilterText} />
   let Female_Back_Colored = <Female_Frontp image = {FBC} setFilterText = {props.setFilterText} />

    const [model, setModel] = useState(Female_Front);
    const [gender, setGender] = useState("female");
    const [view, setView] = useState("front");
    const [colored, setColored] = useState(0);

    const [f, /*setF*/] = useState(F_Unselected);
    const [m, /*setM*/] = useState(M_Unselected);

    useEffect(() => {
        console.log("clicked");
        if (gender === "female" && view === "front" && colored === 0) setModel(Female_Front);
        else if (gender === "female" && view === "front" && colored === 1) setModel(Female_Front_Colored);
        else if (gender === "female" && view === "back" && colored === 0) setModel(Female_Back);
        else if (gender === "female" && view === "back" && colored === 1) setModel(Female_Back_Colored);
        else if (gender === "male" && view === "front" && colored === 0) setModel(Male_Front);
        else if (gender === "male" && view === "front" && colored === 1) setModel(Male_Front_Colored);
        else if (gender === "male" && view === "back" && colored === 0) setModel(Male_Back);
        else if (gender === "male" && view === "back" && colored === 1) setModel(Male_Back_Colored);

    }, [colored, view, gender]);

    
    return (
        <div className="body-column">
            <span className="body-button-container">
                <button id="view" onClick={() => setView("front")}>FRONT</button>
                <button id="view" onClick={() => setView("back")}>BACK</button>
                <button style={{marginLeft:"28px"}} onClick={() => setColored(Math.abs(colored - 1))}> Toggle Body Part Guide </button>
                <div id="gender-buttons">
                    <img id="female-button"
                        alt="Female Button"
                        style={{ width: '24px', height: '24px' }}
                        src={f}
                        onClick={() => setGender("female")}
                    />

                    <img id="male-button"
                        alt="Male Button"
                        style={{ width: '24px', height: '24px' }}
                        src={m}
                        onClick={() => setGender("male")}
                    />

                </div>
            </span>
            {model}
            {/* <img src={gender} width = "100%"></img> */}
        </div>
    )
}

export default BodyMap;