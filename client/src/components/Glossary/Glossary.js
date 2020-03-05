import React from 'react';
import './Glossary.css'
import IntroBar from './intro.png'
import Terms from './terms.json'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const Glossary =()=>{
    return(
        <div>
            <div className = "expand">
                <img className = "intro-image" src={ IntroBar } alt="intro" />
            </div>
            
            <div >
                <form>
                    <input type="text" placeholder="Search Terms..."/>
                </form>
                { Terms.map((glossaryEntry)=>{
                    return(
                        <div className="column1" >
                            <p>{glossaryEntry.title}</p>
                            <div>
                                <p> Definition: {glossaryEntry.definition}</p>
                            </div>
                            <div>
                                <p> Usage: {glossaryEntry.usage}</p>
                            </div>
                            
                        </div>
                    
                    )
                })}
            </div>
        </div>
        
        ////search bar 
        ////terms components, big letters, plus each term starting wiht that letter, plus definition
        ///letters nav bar to the side 

    );

   
}

export default Glossary;