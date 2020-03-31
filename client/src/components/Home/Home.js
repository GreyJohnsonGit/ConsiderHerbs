import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import Carousel from 'react-bootstrap/Carousel';
import BodyMap from './home_components/BodyMap.js';
import RecipeList from './home_components/RecipeList.js';
import RecipePopUp from './home_components/RecipePopup.js';
import './Home.css';

let entryToEdit = {
    name: '',
    bodypart: '',
    ailment: '',
    ingredients: [],
    description: ''
};

let mode = 'edit';

const Home = ()=> {
    let searchInput = React.createRef();

    const [ showPopup, setShowPopup ] = useState(0);
    const [ filterText,setFilterText ] = useState('');

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

    return (
        <div>
            <div>
                <Carousel>
                    <Carousel.Item>
                        <img
                            src='http://picsum.photos/id/1023/1440/400'
                            style={{width:'100%',height:'auto'}}
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            src='http://picsum.photos/id/189/1440/400'
                            style={{width:'100%',height:'auto'}}
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            src='http://picsum.photos/id/159/1440/400'
                            style={{width:'100%',height:'auto'}}
                        />
                    </Carousel.Item>
                </Carousel>
            </div>
            { showPopup ? <RecipePopUp
                closeFn={toggleShowPopup}
                entry={entryToEdit}
                mode={mode}
                /> : null}            
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
                    <BodyMap />
                </div>
                <div className='recipe-column'>
                    <h2>Select Your Area of Discomfort</h2>
                    <form>
                        <input 
                            type='text'
                            placeholder='Search Recipes'
                            ref={searchInput}
                            onChange={() => filterUpdate(searchInput.current.value)}
                        />
                        <button type='submit'>Search</button>
                        <button type='button' onClick={toggleNewEntry}>New Recipe</button>
                    </form>
                    <RecipeList
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
                    <input type='text' placeholder='Enter your email here...' />
                    <Link className="sign-up-about" to="../SignIn/SignUp">Sign Up</Link>
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
