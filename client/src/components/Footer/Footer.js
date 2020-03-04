import React from 'react';
import { Link } from 'react-router-dom';

import './Footer.css';

const Footer=()=>{
    return(
        <div className = "footer">
            <p>This is the footer of the pagee </p>
            <div classname="linksColumn">
                <div classname= "row">
                    <h3> Fast Links </h3>
                </div>
                <div classname= "row">
                    <Link className = "foot-link" to='/Home'>HOME</Link>
                </div>

                <div classname= "row">
                    <Link className = "foot-link" to='/Forum'>FORUM</Link> 
                </div>

                <div classname= "row">
                    <Link className = "foot-link" to='/DidYouKnow'>DID YOU KNOW</Link>
                </div>

                <div classname= "row">
                    <Link className = "foot-link" to='/Glossary'>GLOSSARY</Link>
                </div>

                <div classname= "row">
                    <Link className = "foot-link" to='/About'>ABOUT</Link>
                </div>

                <div classname= "row">
                    <Link className = "foot-link" to='/Schedule'>SCHEDULE</Link>
                </div>
            
            </div>
        </div>

    );
}

export default Footer;