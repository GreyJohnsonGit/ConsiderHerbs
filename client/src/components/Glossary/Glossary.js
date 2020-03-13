//import Col from 'react-bootstrap/Col';
import React from 'react';
//import Row from 'react-bootstrap/Row';

import AlphabetList from "./glossary_components/AlphabetList";
//import IntroBar from './intro.png';
import TermInfo from "./glossary_components/TermInfo";
import Rosemarys from "./Rosemary.JPG";

import './Glossary.css';


const Glossary =()=>{
    return(
        <div>            
            <div className = "container">
                <img alt = "Plants" src = { Rosemarys } width = "100%"/>
                <div className = "green-bar"></div>
                <div className = "text-block">
                    <div> LET'S TALK ABOUT HERBS! </div>
                </div>
            </div>

            <div className = "search" id="search_bar">
                <form>
                    <input type="text" placeholder="Search Terms..."/>
                    <button type="submit">Search</button>
                </form>
            </div>
            
            <div className="column2">
                <TermInfo/>
            </div>

            <div className="column3">
                <AlphabetList />
            </div>

        </div>
        
        ////search bar 
        ////terms components, big letters, plus each term starting wiht that letter, plus definition
        ///letters nav bar to the side 

        // make search bar or alphabet list sticky?

    );

   
}

export default Glossary;