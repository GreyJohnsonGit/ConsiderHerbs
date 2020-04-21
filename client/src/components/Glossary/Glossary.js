//import Col from 'react-bootstrap/Col';
import React, {useState} from 'react';
//import { MdClose } from 'react-icons/md';
import './Glossary.css';
import Weeds from './Rosemary.JPG';
import TermInfo from "./glossary_components/TermInfo";
import AlphabetList from "./glossary_components/AlphabetList";
import axios from 'axios';
import config from '../../config.js'
import AdminPopup from "../Admin/AdminPopup";
import {useCookies} from 'react-cookie';

const Glossary = (props) =>{
    const [showPopup, setShowPopup] = useState(0);
    const [mode, setMode] = useState('');
    let [typed, typedUpdate]=useState(props.location.search.substring(1));
    let [/*found*/, foundUpdate]=useState(1) //true
    const [cookies, ] = useCookies(['user']);
    const [title, setTitle] = useState('');
    const [definition, setDefinition] = useState('');
    const [usage, setUsage] = useState('');
    const [tier, setTier] = useState(0);

    const handleTitle = (event) => {
        setTitle(event.target.value);
    }
    const handleDefinition = (event) => {
        setDefinition(event.target.value);
    }
    const handleUsage = (event) => {
        setUsage(event.target.value);
    }
    const handleTier = (event) => {
        setTier(event.target.value);
    }
    
    const searchTerm=(prop)=>{
        prop.preventDefault()
    }

    const toggleShowPopup = () => {
        setShowPopup(!showPopup);
    };
    const toggleEdit = (entry) => {
        setTitle(entry.title);
        setDefinition(entry.definition);
        setUsage(entry.usage);
        setTier(entry.userLevel);
        setMode('edit');
        toggleShowPopup();
    };
    const toggleNewEntry = () => {
        setTitle('');
        setDefinition('');
        setUsage('');
        setTier(0);
        setMode('new');
        toggleShowPopup();
    }
    
    const submitForm = (event) => {
        if(mode === 'edit') {
            axios.put(
                config.address + '/api/Glossary/' + title,
                {
                    title: title,
                    definition: definition,
                    usage: usage,
                    userLevel: tier
                }
            )
            .then((res) => {
                console.log(res);
                toggleShowPopup();
            })
            .catch((err) => {
                console.error(err);
                toggleShowPopup();
            })
        }
        if(mode === 'new') {
            axios.post(
                config.address + '/api/Glossary/',
                {
                    title: title,
                    definition: definition,
                    usage: usage,
                    userLevel: tier
                }
            )
            .then((res) => {
                console.log(res);
                toggleShowPopup();
            })
            .catch((err) => {
                console.error(err);
                toggleShowPopup();
            })
        }
    }

    return(
        <div>
            <div className = "image-container">
                <img alt = "Plants" src = { Weeds } width = "100%"/>
                <div class = "text-block">
                    <div>  Glossary Page   </div>
                </div>
            </div>
            <AdminPopup closeFn={toggleShowPopup} showPopup={showPopup}>
                <form onSubmit={submitForm}>
                    <label htmlFor='title'>Title</label>
                    <input type='text' id='title' value={title} onChange={handleTitle}/>

                    <label htmlFor='tier'>Tier</label>
                    <select id='tier' onChange={handleTier}>
                        <option value='2' selected={tier == 2}>Premium</option>
                        <option value='1' selected={tier == 1}>Subscriber</option>
                        <option value='0' selected={tier == 0}>Guest</option>
                    </select>

                    <label htmlFor='definition'>Defintion</label>
                    <textarea rows='3' id='definition' value={definition} onChange={handleDefinition}/>

                    <label htmlFor='usage'>Usage</label>
                    <textarea rows='3' id='usage' value={usage} onChange={handleUsage}/>

                    <button type='submit' id="admin-button">Submit</button>
                </form>
            </AdminPopup>   
            <div className = "glossary-search" id="search_bar">
                <form>
                    <input type="text" placeholder="Search Terms..." 
                        onChange={(event)=>{typedUpdate(event.target.value)}}
                        defaultValue={typed}
                    />
                    <button type="submit" onClick={searchTerm}>Search </button>
                    { cookies.user && cookies.user.userLevel >= 3 ? <button type='button' className='admin-button' onClick={toggleNewEntry}>New</button> : null }
                </form>
            </div>

            <div className="column-container">
                <div className="column1">
                    <TermInfo editFn={toggleEdit} lookingFor={typed} foundUp={foundUpdate} userLevel={cookies.user.userLevel}/>
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