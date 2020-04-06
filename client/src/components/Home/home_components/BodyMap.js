import React, { useState, /*useEffect*/ } from 'react';
import Male_Front from './images/Male_Front.png';
import Female_Front from './images/Female_Front.png';
import Neutral_Front from './images/Neutral_Front.png';

//import F_Selected from './images/F_Selected.png';
import F_Unselected from './images/F_Unselected.png';
//import M_Selected from './images/M_Selected.png';
import M_Unselected from './images/M_Unselected.png';
import N_Selected from './images/N_Selected.png';
//import N_Unselected from './images/N_Unselected.png';
//import { set } from 'mongoose';



const BodyMap = (props) => {

    let ChestArea = "197, 115, 246, 121, 248, 163, 246, 203, 148, 205, 145, 154, 152, 119"

    let neutralFront = <div>
        <img src={Neutral_Front} width="400" useMap='#NFmap'></img>
        <map name="NFmap">
            <area shape="poly" coords={ChestArea} onMouseOver={() => { console.log("Chest") }} onClick={()=>{props.setFilterText("chest")}} />
        </map>
    </div>

    const [gender, setGender] = useState(neutralFront);
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