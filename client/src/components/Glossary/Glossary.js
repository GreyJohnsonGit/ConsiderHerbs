//import Col from 'react-bootstrap/Col';
import React, {useState} from 'react';
//import { MdClose } from 'react-icons/md';
import './Glossary.css';
import Weebs from './Rosemary.JPG';
import TermInfo from "./glossary_components/TermInfo";
import AlphabetList from "./glossary_components/AlphabetList";
import GlossaryPopUp from "./glossary_components/GlossaryPopUp";

let entryToEdit = {
    title: '',
    definition: '',
    usage: ''
};

const Glossary = (props) =>{
    const [showPopup, setShowPopup] = useState(0);
    const [mode, setMode] = useState('');
    let [typed, typedUpdate]=useState('')
    let [/*found*/, foundUpdate]=useState(1) //true
    
    const searchTerm=(prop)=>{
        prop.preventDefault()
    }

    const toggleShowPopup = () => {
        setShowPopup(!showPopup);
    };
    const toggleEdit = (entry) => {
        entryToEdit = entry;
        setMode('edit');
        toggleShowPopup();
    };
    const toggleNewEntry = () => {
        entryToEdit = {
            title: '',
            definition: '',
            usage: ''
        };
        setMode('new');
        toggleShowPopup();
    }

    return(
        <div>
            <div className = "container">
                <img alt = "Plants" src = { Weebs } width = "100%"/>
                <div class = "text-block">
                    <div>  Glossary Page   </div>
                </div>
            </div>
            
            { showPopup ? <GlossaryPopUp closeFn={toggleShowPopup} entry={entryToEdit} mode={mode} /> : null}
            
            <div className = "search" id="search_bar">
                <form>
                    <input type="text" placeholder="Search Terms..." 
                    onChange={(event)=>{typedUpdate(event.target.value)}}
                    />
                    <button type="submit" onClick={searchTerm}>Search </button>
                </form>
            </div>

            <button className='admin-button' onClick={toggleNewEntry}>New</button>

            <div className="column-container">
                <div className="column1">
                    <TermInfo editFn={toggleEdit} lookingFor={typed} foundUp={foundUpdate} />
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