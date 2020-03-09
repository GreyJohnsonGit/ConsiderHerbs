import React from 'react';
import './Glossary.css';
import IntroBar from './intro.png';
import Weebs from './Rosemarys.JPG';
import TermInfo from "./glossary_components/TermInfo";
import AlphabetList from "./glossary_components/AlphabetList";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Glossary =()=>{
    return(
        <div>            
            <div className = "container">
                <img src = { Weebs } width = "100%"/>
                <div class = "text-block">
                    <div> LET'S TALK ABOUT HERBS! </div>
                </div>
            </div>

            <div className = "search" id="search_bar">
                <form>
                    <input type="text" placeholder="Search Terms..."/>
                    <button type="submit">Search</button>
                </form>
            </div>
            
            <div className="column-container">
                <div className="column1">
                    <TermInfo/>
                </div>

                <div className="column2">
                    <AlphabetList />
                </div>
            </div>
        </div>
        
        ////search bar 
        ////terms components, big letters, plus each term starting wiht that letter, plus definition
        ///letters nav bar to the side 

        // make search bar or alphabet list sticky?

    );

   
}

export default Glossary;