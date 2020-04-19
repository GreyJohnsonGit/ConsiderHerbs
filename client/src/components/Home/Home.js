import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import Carousel from 'react-bootstrap/Carousel';
import reactStringReplace from 'react-string-replace';
import {useCookies} from 'react-cookie';
import BodyMap from './home_components/BodyMap.js';
import RecipeList from './home_components/RecipeList.js';
import './Home.css';

import AdminPopup from '../Admin/AdminPopup';
import { FaTrashAlt } from 'react-icons/fa';
import { FaPlusSquare } from 'react-icons/fa';
import carousel_1 from './home_components/images/yellow_flowers.png';
import carousel_2 from './home_components/images/cutting_berries.png';
import carousel_3 from './home_components/images/faded_flowers.png';

import Axios from 'axios';
import config from '../../config.js'
import Async from 'react-async';

let entryToEdit = {
    name: '',
    bodypart: '',
    ailment: '',
    ingredients: [],
    description: ''
};

let mode = 'edit';

const Home = (props) => {
    
    let searchInput = React.createRef();

    const [ showPopup, setShowPopup ] = useState(0);
    const [ filterText,setFilterText ] = useState('');
    const [ userLevel, setUserLevel ] = useState(0);
    const [/*numIngredient*/,setNumIngredients ] = useState(0);
    const [ email, setEmail ] = useState('');
    const [cookies, removeCookie] = useCookies([]);

    const emailHandleChange = event => {
        setEmail(event.target.value);
    }

    const filterUpdate = (value) => {
        setFilterText(value);
    }

    const toggleShowPopup = () => {
        setShowPopup(!showPopup);
    };
    const toggleView = (entry) => {
        entryToEdit = Object.assign({},entry);
        mode = 'view';
        toggleShowPopup();
    };
    const toggleEdit = (entry) => {
        entryToEdit = Object.assign({},entry);
        mode = 'edit';
        toggleShowPopup();
    };
    const toggleNewEntry = () => {
        entryToEdit = {
            name: '',
            bodypart: '',
            ailment: '',
            ingredients: [],
            description: ''
        };
        mode = 'new';
        toggleShowPopup();
    };

    const LoadTerms = () => {
        return Axios.get(
            config.address + '/api/glossary'
        )
        .then(res => {
            return res.data;
        })
        .catch(err => {
            console.error(err);
            return err;
        });
    };

    const glossarizeText = (text,terms) => {
        console.log(text);
        let ret = text;
        terms.forEach((term) => {
            ret = reactStringReplace(ret, new RegExp('\\b(' + term.title + ')\\b','gi'), (match,i) => (
                <Link to={{pathname:'/Glossary', search: term.title}}>{match}</Link>
            ));
        });
        return ret;
    };

    console.log(props)

    return (
        <div>
            <div>
                <Carousel>
                    <Carousel.Item style={{height:"300px", width:"100%", overflow:"hidden"}}>
                        <img
                            alt="Picsum"
                            src={carousel_1}
                            style={{width:'100%'}}
                        />
                    </Carousel.Item>
                    <Carousel.Item style={{height:"300px", width:"100%", overflow:"hidden"}}>
                        <img
                            alt="Picsum"
                            src={carousel_2}
                            style={{width:'100%'}}
                        />
                    </Carousel.Item>
                    <Carousel.Item style={{height:"300px", width:"100%", overflow:"hidden"}}>
                        <img
                            alt="Picsum"
                            src={carousel_3}
                            style={{width:'100%'}}
                        />
                    </Carousel.Item>
                </Carousel>
            </div>

            <AdminPopup closeFn={toggleShowPopup} showPopup={showPopup}>
                { mode === 'view' ?
                    <div>
                        <div className='recipe-popup-title'>
                            {entryToEdit.name}
                        </div>
                        { props.user.userLevel >= entryToEdit.priviledge ?
                            <Async promiseFn={LoadTerms}>
                                {({data,err,isLoading}) => {
                                    console.log(data);
                                    if (isLoading) return "Loading...";
                                    if (err) return `Oops, something went wrong: ${err.message}`
                                    if (data && Array.isArray(data)) 
                                    {
                                        return (
                                            <div>
                                                <div className='recipe-popup-description'>
                                                    {glossarizeText(entryToEdit.description,data)}
                                                </div>
                                                <ul>
                                                    { entryToEdit.ingredients.map((ingredient) => {
                                                        return (
                                                            <li>{glossarizeText(ingredient.ingredient,data)} - {ingredient.amount} {ingredient.unit}</li>
                                                        )
                                                    })}
                                                </ul>
                                            </div>
                                        )
                                    }
                                }}
                            </Async> 
                            : <div className='recipe-popup-description'>Subscribe to view this content</div> }
                    </div>
                :
                    <form action='/Recipe'>
                        <div className='recipe-popup-edit-top-row'>
                            <label htmlFor='name'>Name</label>
                            <label htmlFor='bodypart'>Body Part</label>
                            <label htmlFor='ailment'>Ailment</label>
                            <label htmlFor='tier'>Tier</label>
                            <input type='text' id='name' defaultValue={entryToEdit.name} />
                            <input type='text' id='bodypart' defaultValue={entryToEdit.bodypart} />
                            <input type='text' id='ailment' defaultValue={entryToEdit.ailment} />
                            <select id='tier'>
                                <option value='0' selected={entryToEdit.priviledge == 0}>Guest</option>
                                <option value='1' selected={entryToEdit.priviledge == 1}>Subscriber</option>
                                <option value='2' selected={entryToEdit.priviledge == 2}>Premium</option>
                            </select>
                        </div>
                        <div className='recipe-popup-edit-ingredients'>
                            <span>Ingredient</span>
                            <span>Amount</span>
                            <span>Unit</span>
                            <span></span>
                        </div>
                        { entryToEdit.ingredients.map((ingredient,i) => {
                            return (
                                <div className='recipe-popup-edit-ingredients'>
                                    <input type='text' defaultValue={ingredient.ingredient} />
                                    <input type='text' defaultValue={ingredient.amount} />
                                    <input type='text' defaultValue={ingredient.unit} />
                                    <FaTrashAlt
                                        size='1.7em'
                                        color='red'
                                        onClick={() => {
                                            entryToEdit.ingredients.splice(i,1);
                                            setNumIngredients(entryToEdit.ingredients.length);
                                        }}
                                    />
                                </div>
                            )
                        })}
                        <FaPlusSquare
                            size='1.7em'
                            color='green'
                            onClick={() => {
                                entryToEdit.ingredients.push([]);
                                setNumIngredients(entryToEdit.ingredients.length);
                            }}
                        />
                        <label for='description'>Description</label>
                        <textarea rows='3' id='description' value={entryToEdit.description}/>
                        
                        <button type='submit'>Submit</button>
                    </form>
                }
            </AdminPopup>

            <div className='home-text-container-1'>
                <p>
                You are looking at an amazing tool call H.O.W (Herbs, Oils , Wellbeing) 
                that was developed out of the desire and a passion to simplify one of 
                the many paths to self love and care through natural means using our plant friends.  
                </p>
                <p>
                This is by no means the say all be all. Many of us who are farther 
                along in our journey let's not forget our humble beginning. Do you 
                remember the not knowing but having a need and wanting a healthier 
                less side effect ridden solution, The apprehension and information 
                overload that came with an internet search or for user well seasoned 
                individual who remember these things called books on the subject 
                that was hard to find or non existent.
                </p>
                <p>
                This path can and will lead to you discovering and respecting the 
                world of natural healing in its many forms. So feel free to explore
                </p>
                <p>
                Whole Body Wellness.
                </p>
            </div>
            <div className='body-recipe-container'>
                <div className='body-column'>
                    <BodyMap filterText= {filterText}
                        setFilterText = {setFilterText} />
                </div>
                <div className='recipe-column'>
                    <div style={{position: 'relative'}}>
                        <h2>Select Your Area of Discomfort on the Body Model</h2>
                    </div>
                    <form className='search' style={{marginTop:"5px"}}>
                        <input 
                            type='text'
                            placeholder='Search Recipes...'
                            ref={searchInput}
                            onChange={() => filterUpdate(searchInput.current.value)}
                        />

                        {  cookies.user.userLevel === 3 ? 
                            <div>
                                <button type='submit'>Search</button>
                                <button type='button' onClick={toggleNewEntry}>New Recipe</button>
                            </div>
                            :
                            <button type='submit'>Search</button>
                        }
                    </form>

                    <RecipeList
                        userLevel={cookies.user.userLevel}
                        viewFn={toggleView}
                        editFn={toggleEdit}
                        filterText={filterText}
                    />

                </div>
            </div>
            <div className="email-container">
                <h1>Oh, won't you consider herbs with us?</h1>
                <h3>Subscribe to view exclusive content</h3>
                <form>
                    <input type='text' onChange={emailHandleChange} value={email} placeholder='Enter your email here...' />
                    <Link className="sign-up-about" to={{pathname:"/SignUp",state:{email: email}}}>Sign Up</Link>
                </form>
            </div>
            <div className='home-text-container-1'>
                <p>
                Welcome to my site. My intentions are to present the information in 
                a fun, inviting easy digestible format. One that will reignite that 
                natural innate desire to return to a more holistic earth based approach 
                to our health and well being.
                </p>
                <p> 
                <b>Do you remember your first introduction?</b>
                </p>
                <p>
                Some people started with an oil, other with teas or a fresh herb in a 
                dish. I remember how a few sniffs of a peppermint oil suggested by a 
                friend relieved an headache almost instantly. I was hooked and the desire 
                and passion was born to learn , share and help people experience the joy of 
                listening to our body and healing with nature.
                </p>            
            </div>
        </div>
    );
}

export default Home;
