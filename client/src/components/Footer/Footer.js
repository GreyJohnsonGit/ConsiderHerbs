//import Col from 'react-bootstrap/Col';
//import { Link } from 'react-router-dom';
//import Row from 'react-bootstrap/Row';
import React from 'react';

import './Footer.css';

//import TempLogo from "./temp_logo.png";

import { FaInstagram } from 'react-icons/fa';
import { FiPhoneCall, FiMapPin } from 'react-icons/fi';
import { AiOutlineMail } from 'react-icons/ai';
import { IoIosGlobe } from 'react-icons/io';
import { IconContext } from 'react-icons/lib/cjs';
import  ReactTooltip  from 'react-tooltip';

const iconSize = '1.75em'

const Footer=()=>{
    return(
        <footer id= "footer" style={{zIndex:"98"}}>
            {/*<img className = "footer-logo" src={ TempLogo } alt="logo" />*/}
            <div className="footer-container">
                <div className="text-container">Consider Herbs</div>
                <div className="link-container">
                    <h1>Fast Links:</h1>
                    <a href='/Home'>Home</a>
                    <a href='/Forum'>Forum</a>
                    <a href='/Glossary'>Glossary</a>
                    <a href='/About'>About</a>
                    <a href='/Schedule'>Schedule</a>
                </div>
                <div className="icon-container">
                    <IconContext.Provider value={{ className: 'react-icons' }}>
                            {/*<ReactTooltip title="000">
                                <span>
                                <FaMobileAlt  size={iconSize} className='react-icons'/>
                                </span>
                                {<span className="tooltiptext">Tooltip text</span>}
                            </ReactTooltip>
                            */}   

                            
                            {/*<FaMobileAlt size={iconSize} className='react-icons'/>*/}
                            <FiPhoneCall size={iconSize} className='react-icons'/>
                            <p>(954)000-000</p>
                            <AiOutlineMail size={iconSize} className='react-icons'/>
                            <p>Dee@ConsiderHerbs.com</p>
                            <FaInstagram size={iconSize} className='react-icons'/>
                            <p>@considerherbs </p>
                            <FiMapPin size={iconSize} className='react-icons'/>
                            <p>Gainesville, FL</p>
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