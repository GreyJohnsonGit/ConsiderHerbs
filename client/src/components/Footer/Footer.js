//import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import React from 'react';

import './Footer.css';

const Footer=()=>{
    return(
        <div className = "footer" id= "footer">
            <Row>
                <div>
                    <b> Fast Links </b>
                    <Row>
                        <Link className = "foot-link" to='/Home'>HOME</Link>
                    </Row>

                    <Row>
                        <Link className = "foot-link" to='/Forum'>FORUM</Link> 
                    </Row>

                    <Row>
                        <Link className = "foot-link" to='/DidYouKnow'>DID YOU KNOW</Link>
                    </Row>

                    <Row>
                        <Link className = "foot-link" to='/Glossary'>GLOSSARY</Link>
                    </Row>

                    <Row>
                        <Link className = "foot-link" to='/About'>ABOUT</Link>
                    </Row>

                    <Row>
                        <Link className = "foot-link" to='/Schedule'>SCHEDULE</Link>
                    </Row>
                </div>
            </Row>
        </div>

    );
}

export default Footer;