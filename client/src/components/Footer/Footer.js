import React from 'react';
import { Link } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './Footer.css';

import TempLogo from "./temp_logo.png";

import { FaMobileAlt } from 'react-icons/fa';
import { FiPhoneCall, FiMapPin } from 'react-icons/fi';
import { AiOutlineMail } from 'react-icons/ai';
import { IoIosGlobe } from 'react-icons/io';
import { IconContext } from 'react-icons/lib/cjs';

const iconSize = '1.75em'

const Footer=()=>{
    return(
        <footer id= "footer">
            {/* <img className = "footer-logo" src={ TempLogo } alt="logo" /> */}
            <div className="footer-container">
                <div className="text-container">Consider Herbs</div>
                <div className="link-container">
                    <h1>Fast Links:</h1>
                    <a href='/Home'>Home</a>
                    <a href='/Forum'>Forum</a>
                    {/* <a href='/DidYouKnow'>Did you know?</a> */}
                    <a href='/Glossary'>Glossary</a>
                    <a href='/About'>About</a>
                    <a href='/Schedule'>Schedule</a>
                </div>
                <div className="icon-container">
                    <IconContext.Provider value={{ className: 'react-icons' }}>
                            <FaMobileAlt size={iconSize} className='react-icons'/>
                            <FiPhoneCall size={iconSize} className='react-icons'/>
                            <AiOutlineMail size={iconSize} className='react-icons'/>
                            <IoIosGlobe size={iconSize} className='react-icons'/>
                            <FiMapPin size={iconSize} className='react-icons'/>
                    </IconContext.Provider>
                </div>
                <div className="disclaim-container">
                    <p>
                        Disclaimer: The information presented herein by Consider Herbs is intended for educational purposes only. These statements have not been evaluated by the FDA and are not intended to diagnose, cure, treat or prevent disease. Individual results may vary, and before using any supplements, it is always advisable to consult with your own healthcare provider.
                    </p>
                    Consider Herbs © 2019
                </div>
            </div>
        </footer>

    );
}

export default Footer;