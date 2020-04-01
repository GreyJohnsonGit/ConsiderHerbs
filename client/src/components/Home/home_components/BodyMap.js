import React, { useState, /*useEffect*/ } from 'react';
import Male_Front from './Male_Front.png';
import Female_Front from './Female_Front.png';
import Neutral_Front from './Neutral_Front.png';

//import F_Selected from './F_Selected.png';
import F_Unselected from './F_Unselected.png';
//import M_Selected from './M_Selected.png';
import M_Unselected from './M_Unselected.png';
import N_Selected from './N_Selected.png';
//import N_Unselected from './N_Unselected.png';
//import { set } from 'mongoose';


const BodyMap = () => {

    const [ gender, setGender ] = useState(Neutral_Front);
    const [ f, /*setF*/ ] = useState(F_Unselected);
    const [ m, /*setM*/ ] = useState(M_Unselected);
    const [ n, /*setN*/ ] = useState(N_Selected);

    return (
        <div className="body-column">
            <span className="body-button-container">
                <button id="view">FRONT</button>
                <button id="view">BACK</button>
                <div id="gender-buttons">
                    <img id="female-button"
                        alt="Female Button" 
                        style={{width:'24px',height:'24px'}}
                        src={f} 
                        onClick={() => setGender(Female_Front)}
                    />

                    <img id="male-button"
                        alt="Male Button"
                        style={{width:'24px',height:'24px'}}
                        src={m} 
                        onClick={() => setGender(Male_Front)}
                    />

                    <img id="neutral-button"
                        alt="Neutral Button"
                        style={{width:'24px',height:'24px'}}
                        src={n} 
                        onClick={() => setGender(Neutral_Front)}
                    />
                </div>
            </span>
            <img alt="Gender" src = { gender } width = "100%"/>
        </div>
    )
}

export default BodyMap;