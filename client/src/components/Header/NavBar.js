import React from 'react';
import { Link } from 'react-router-dom';

import './NavBar.css';
import ConsiderLogo from './ConsiderLogo.png';

const NavBar = () => {
    return (
        <div className = "header">
            {/* Logo */}
            {/*CANT SEEM TO FIGURE OUT HOW THAT WORKS JUST YET*/}
            <Link className = "nav-title" to="/">
               <img className = "nav-logo" src={ ConsiderLogo } alt="logo" />
                
            </Link>

            {/* Page Links */}
            <div className = "nav-items">
                <Link className = "nav-link" to='/Home'>HOME</Link>
                <Link className = "nav-link" to='/Forum'>FORUM</Link> 
                <Link className = "nav-link" to='/DidYouKnow'>DID YOU KNOW</Link>
                <Link className = "nav-link" to='/Glossary'>GLOSSARY</Link>
                <Link className = "nav-link" to='/About'>ABOUT</Link>
                <Link className = "nav-link" to='/Schedule'>SCHEDULE</Link>
                {/*<Link className = "nav-link" to='/Register'>Forum</Link> */}
            </div>

        </div>
    )
};

export default NavBar;
