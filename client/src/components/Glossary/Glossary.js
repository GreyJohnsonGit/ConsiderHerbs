import React from 'react';
import './Glossary.css'
import IntroBar from './intro.png'
import Terms from './terms.json'
//import * as fs from 'fs'

/*let terms;
fs.readFile('terms.json', 'utf8',(data, err)=>{
    terms=JSON.parse(data);
});
*/
const Glossary =()=>{
    return(
        <div>
            <img className = "intro-image" src={ IntroBar } alt="intro" />
            <h1>THIS IS THE GLOSSARY PAGE</h1>
            { Terms.map((glossaryEntry)=>{
                return(
                    <div>
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
        ////search bar 
        ////terms components, big letters, plus each term starting wiht that letter, plus definition
        ///letters nav bar to the side 

    );
}

export default Glossary;