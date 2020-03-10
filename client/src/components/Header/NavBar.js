import React from 'react';
import { Link } from 'react-router-dom';

import './NavBar.css';
import ConsiderLogo from './ConsiderLogo.png';

import { IoIosMenu } from 'react-icons/io';

const NavBar = () => {
    return (
        <div className = "header" >
            {/* Logo */}
            {/*CANT SEEM TO FIGURE OUT HOW THAT WORKS JUST YET*/}
            <Link className = "nav-title" to="/">
               <img className = "nav-logo" src={ ConsiderLogo } alt="logo" />
            </Link>

            {/* Page Links */}
            <div className = "nav-items">
                <Link className = "nav-link" to='/Home'>HOME</Link>
                <Link className = "nav-link" to='/Forum'>FORUM</Link> 
<<<<<<< HEAD
=======
                {/* <Link className = "nav-link" to='/DidYouKnow'>DID YOU KNOW</Link> */}
>>>>>>> d0e0facc522d1597fa6b1bc6cd3c53485ba7c7f7
                <Link className = "nav-link" to='/Glossary'>GLOSSARY</Link>
                <Link className = "nav-link" to='/About'>ABOUT</Link>
                <Link className = "nav-link-last" to='/Schedule'>SCHEDULE</Link>
                <Link className = "nav-link-sign-in" to='/SignIn'>SIGN IN</Link>
                {/*<Link className = "nav-link" to='/Register'>Forum</Link> */}
            </div>

        </div>
    )
};

export default NavBar;
