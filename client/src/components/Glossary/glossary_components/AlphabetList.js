//import $ from "jquery"
//import { Button } from 'react-bootstrap';
import React from 'react';
//import scrollto from "jquery.scrollto"

//import Terms from '../terms.json';

const alphabet = '#abcdefghijklmnopqrstuvwxyz'.toUpperCase().split('');
const scrollToId = (id,block) => {
    console.log(id + " was clicked");
    let element = document.getElementById(id);
    if(element!=null)
    {    element.scrollIntoView({behavior: "smooth" , block: block});}
}
const AlphabetList =()=>{
    return(
        <div className="alphabet-list-container">
            <button className="letter" onClick={() => {scrollToId('search_bar','end')}}> Top </button>
            { alphabet.map((letter) => {
                return(
                    <button className="letter" onClick={() => {scrollToId(`${letter}`,'center')}}> {letter} </button>
                )
            })}
            <button className="letter" onClick={() => {scrollToId('footer','end')}}>Bottom</button>
        </div>
    )
};
export default AlphabetList;