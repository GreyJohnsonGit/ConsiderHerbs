import React, { useState, /*useEffect*/ } from 'react';
import Male_Frontp from './MaleBody.js';
import Female_Frontp from './FemaleBody.js';
import Neutral_Front from './images/Neutral_Front.png';

//import F_Selected from './images/F_Selected.png';
import F_Unselected from './images/F_Unselected.png';
//import M_Selected from './images/M_Selected.png';
import M_Unselected from './images/M_Unselected.png';
import N_Selected from './images/N_Selected.png';
//import N_Unselected from './images/N_Unselected.png';
//import { set } from 'mongoose';



const BodyMap = (props) => {

   let Male_Front = <Male_Frontp setFilterText = {props.setFilterText} />
   let Female_Front = <Female_Frontp setFilterText = {props.setFilterText} />

    const [gender, setGender] = useState(Male_Front);
    const [f, /*setF*/] = useState(F_Unselected);
    const [m, /*setM*/] = useState(M_Unselected);
    const [n, /*setN*/] = useState(N_Selected);

    

    return (
        <div className="body-column">
            <span className="body-button-container">
                <button id="view">FRONT</button>
                <button id="view">BACK</button>
                <div id="gender-buttons">
                    <img id="female-button"
                        alt="Female Button"
                        style={{ width: '24px', height: '24px' }}
                        src={f}
                        onClick={() => setGender(Female_Front)}
                    />

                    <img id="male-button"
                        alt="Male Button"
                        style={{ width: '24px', height: '24px' }}
                        src={m}
                        onClick={() => setGender(Male_Front)}
                    />

                    <img id="neutral-button"
                        alt="Neutral Button"
                        style={{ width: '24px', height: '24px' }}
                        src={n}
                        onClick={() => setGender(Neutral_Front)}
                    />
                </div>
            </span>
            {gender}
            {/* <img src={gender} width = "100%"></img> */}
        </div>
    )
}

export default BodyMap;