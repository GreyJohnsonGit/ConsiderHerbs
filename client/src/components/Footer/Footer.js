import React from 'react';
import { Link } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './Footer.css';
import TempLogo from "./temp_logo.png";
//import { FaMobileAlt, FiPhoneCall, AiOutlineMail, IoIosGlobe, FiMapPin } from 'react-icons/fa';

const Footer=()=>{
    return(
        <footer id= "footer">
            {/* <img className = "footer-logo" src={ TempLogo } alt="logo" /> */}
            <div className="footer-container">
                <div className="text-container">Consider Herbs</div>
                <div className="link-container">Links</div>
                <div className="icon-container">
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