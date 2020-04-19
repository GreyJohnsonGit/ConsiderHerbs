import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './NavBar.css';
import ConsiderLogo from './ConsiderLogo.png';
import {useCookies} from 'react-cookie';

import { IoIosMenu } from 'react-icons/io';

const NavBar = (props) => {
    const [cookies, removeCookie] = useCookies([]);
    const [navMenu,setNavMenu] = useState(0);

    const toggleNavMenu = () => {
        setNavMenu(!navMenu);
    }

    const UserButton = () => {
        if(props.user.userLevel) {
            return (
                <div>
                    {/*<a className = "nav-link-sign-in" href='/SignIn' onClick={(e) => {
                        removeCookie('user');
                        props.setUser({
                            userLevel: 0,
                            session: {}
                        });
                    }}>
                    LOG OUT
                    </a> */}
                    <Link className="nav-link-sign-in" to="/Profile">PROFILE</Link>
                </div>
            );
        }
        else {
            return (<Link className = "nav-link-sign-in" to='/SignIn'>SIGN IN</Link>);
        }
    }

    return (
        <div className = "header" >
            {/* Logo */}
            <Link className = "nav-title" to="/">
               <img className = "nav-logo" src={ ConsiderLogo } alt="logo" />
            </Link>

            {/* Page Links */}
            <div className={navMenu ? "nav-items responsive" : "nav-items"}>
                <Link className = "nav-link" to='/Home'>HOME</Link>
                <Link className = "nav-link" to='/Forum'>FORUM</Link> 
                <Link className = "nav-link" to='/Glossary'>GLOSSARY</Link>
                <Link className = "nav-link" to='/About'>ABOUT</Link>
                <Link className = "nav-link" to='/Schedule'>SCHEDULE</Link>
                <Link className = "nav-link-last" to='/Products'>PRODUCTS</Link>
                <UserButton></UserButton>
            </div>

            <div className='nav-menu-button-container'>
                <IoIosMenu className='nav-menu-button' size='2.3em' onClick={toggleNavMenu} />
            </div>

        </div>
    )
};

export default NavBar;
