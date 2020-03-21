//import Col from 'react-bootstrap/Col';
import React, {useState} from 'react';

import './Glossary.css';
import Weebs from './Rosemarys.JPG';
import TermInfo from "./glossary_components/TermInfo";
import AlphabetList from "./glossary_components/AlphabetList";



const Glossary =()=>{
    let [typed, typedUpdate]=useState('')
    let [found, foundUpdate]=useState("false")
    let [notFound,notFoundUpdate]=useState('')
    
    foundUpdate=(prop)=>{
        found=prop;
    }
   
    const searchTerm = (prop)=>{
        prop.preventDefault() //prevents the page from reloading when you click search 
        //but it also stops the page from reloading when you are in glossary and click on the "glossary" button, which we don't want 
        /*if(found="false") { 
            //<b>The term you are looking for was not found</b>
            //I was trying to get this to work so that it would say term not found, but it works weird
            //if you know a better way to do this go ahead 
            notFoundUpdate("term not found");
            console.log("not found")
        }
        */
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
                    <b>{notFound}</b>
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