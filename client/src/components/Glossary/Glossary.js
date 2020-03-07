import React from 'react';
import './Glossary.css';
import IntroBar from './intro.png';
import Weebs from './Rosemarys.JPG';
import TermInfo from "./glossary_components/TermInfo";
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

            <div className = "search">
                <form>
                    <input type="text" placeholder="Search Terms..."/>
                    <button type="submit">Search</button>
                </form>
            </div>
            

            <TermInfo/>

        </div>
        
        ////search bar 
        ////terms components, big letters, plus each term starting wiht that letter, plus definition
        ///letters nav bar to the side 

    );

   
}

export default Glossary;