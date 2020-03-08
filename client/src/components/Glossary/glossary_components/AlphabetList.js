import React from 'react';
import Terms from '../terms.json';
import { Button } from 'react-bootstrap';
import $ from "jquery"
import scrollto from "jquery.scrollto"

const alphabet = '#abcdefghijklmnopqrstuvwxyz'.toUpperCase().split('');

//const $ = window.$;

const clickTop = ()=>{
    console.log("Top was clicked")   
    let topOfPage = document.getElementById("search_bar");
    topOfPage.scrollIntoView({behavior: "smooth" , block: "end"})
  
}
const clickBottom = ()=>{
    console.log("Bottom was clicked")
    console.log($('#footer'));
    let endOfPage = document.getElementById("footer");
    endOfPage.scrollIntoView({behavior: "smooth" , block: "end"})
}
const clickLetter = ()=>{
    console.log("Letter was clicked")
}

const AlphabetList =()=>{
    return(
        <div className="alphabet-list-container">
            
               <button className="letter" onClick={clickTop} href="#footer"> Top </button>
            
            { alphabet.map((letter) => {
                return(
                    <div>
                        <button className="letter" onClick={clickLetter}> {letter} </button>
                    </div>
                )
            })}
            <button className="letter" onClick={clickBottom}>Bottom</button>
        </div>
    )
};

export default AlphabetList;