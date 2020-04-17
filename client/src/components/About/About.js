import React from 'react';
import './About.css';
import { Link } from 'react-router-dom'
import PlantIcon from './plant-icon.png'
import Forest from './rosemary-forest.jpg'


const About =()=>{
    return(
        <div>
            <div className="image-container">
                <img alt="Forest" src={Forest} style={{width:'100%',height:'auto'}}/>
                <img alt="PlantIcon" src={PlantIcon} className='plant-icon' id="plant-icon-1" />
                <div className="overlay-container">
                    <div id='about-description-spacer'></div>
                    <div id='about-title'>About Us</div>
                    <div id='about-description-container'>
                        We encourage you to make lifestyle changes one step at a time that put you back in control of your life and health -
                        which is your most valuable gift - while rediscovering with the help of mother nature and living in sync with her you can heal your self.
                    </div>
                </div>
            </div>
            <div className="email-container">
                <h1>Oh, won't you consider herbs with us?</h1>
                <h3>Subscribe to view exclusive content</h3>
                <form>
                    <input type='text' placeholder='Enter your email here...' />
                    {/*<button type='submit'>Sign Up</button>*/}
                    <Link className="sign-up-about" to="../SignIn/SignUp"> Sign Up </Link>
                    
                </form>
            </div>
            <div className="bottom-container">
                <div className="plant-icon-container" id='pic1'>
                    <img alt="PlantIcon" src={PlantIcon} className='plant-icon' id='plant-icon-2' />
                    <p>Our intentions are to educate and to show you no matter where you
                     are in your life's journey you can and should connect with mother nature.</p>
                </div>
                <div className="plant-icon-container" id='pic2'>
                    <img alt="PlantIcon" src={PlantIcon} className='plant-icon' id='plant-icon-2' />
                    <p>These thoughtful actions will ensure the wellbeing of your mind,
                     body and spirit. You will realize the amazing plant allies nature has provided for us.</p>
                </div>
                <div className="plant-icon-container" id='pic3'>
                    <img alt="PlantIcon" src={PlantIcon} className='plant-icon' id='plant-icon-2' />
                    <p>You can incorporate them in your daily life in many forms such as
                     herbs, oils, teas, food and tinctures to name a few.</p>
                </div>
            </div>
        </div>
    );
}

export default About;