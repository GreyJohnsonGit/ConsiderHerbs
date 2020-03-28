//import Col from 'react-bootstrap/Col';
import React, {useState} from 'react';
import { MdClose } from 'react-icons/md';

import './Glossary.css';
import Weebs from './Rosemarys.JPG';
import TermInfo from "./glossary_components/TermInfo";
import AlphabetList from "./glossary_components/AlphabetList";
import { not } from 'should';

<<<<<<< Updated upstream
=======
let entryToEdit = { 
    title: '',
    definition: '',
    usage: ''
};
>>>>>>> Stashed changes


const Glossary =()=>{
    let [typed, typedUpdate]=useState('')
    let [found, foundUpdate]=useState(1) //true
    //let [notFound,notFoundUpdate]=useState(0) //false
    
    const searchTerm=(prop)=>{
        prop.preventDefault()
    }
  
    return(
        <div>            
            <div className = "container">
                <img alt = "Plants" src = { Weebs } width = "100%"/>
                <div class = "text-block">
                    <div>  Glossary Page   </div>
                </div>
            </div>

            <div className = "search" id="search_bar">
                <form>
                    <input type="text" placeholder="Search Terms..." 
                    onChange={(event)=>{typedUpdate(event.target.value)}}
                    />
                    {console.log(typed)}
                    <button type="submit" onClick={searchTerm}>Search </button>
                    
                </form>
            </div>
            
            <div className="column-container">
                <div className="column1">
                    <TermInfo lookingFor={typed} foundUp={foundUpdate} />
                </div>
                { /*found ? condition : null*/}

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