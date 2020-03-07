import React from 'react';
import './Glossary.css';
import IntroBar from './intro.png';
import TermInfo from "./glossary_components/TermInfo";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Glossary =()=>{
    return(
        <div>
            <img className = "intro-image" src={ IntroBar } alt="intro" />

            <div className = "form">
                <form>
                    <input type="text" placeholder="Search Terms..."/>
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