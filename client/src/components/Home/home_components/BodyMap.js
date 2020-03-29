import React from 'react';
import Male_Front from './Male_Front.png';

const BodyMap = () => {
    return (
        <div className="body-column">
            <span className="body-button-container">
                <button id="view">FRONT</button>
                <button id="view">BACK</button>
                <div id="sex">
                    <button id="sex-button"><b>♂</b></button>
                    <button id="sex-button"><b>♀</b></button>
                    <button id="sex-button">⚲</button>
                </div>
            </span>
            <img alt = "Plants" src = { Male_Front } width = "100%"/>
        </div>
    )
}

export default BodyMap;