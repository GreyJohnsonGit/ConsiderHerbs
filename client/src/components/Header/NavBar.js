import React from 'react';
import { Link } from 'react-router-dom';

import './NavBar.css';
import ConsiderLogo from './ConsiderLogo.png';
import {useCookies} from 'react-cookie';

// import { IoIosMenu } from 'react-icons/iSo';

const NavBar = (props) => {
    const [cookies,, removeCookie] = useCookies([]);

    const UserButton = () => {
        if(props.user.isLoggedIn) {
            return (
                <div>
                    <a className = "nav-link-sign-in" href='/SignIn' onClick={(e) => {
                        console.log('link was clicked');
                        removeCookie('session');
                        props.setUser({
                            isLoggedIn: false,
                            userLevel: 0,
                            username: 'Anon'
                        });
                    }}>
                    LOG OUT
                    </a>
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
            <div className = "nav-items">
                <Link className = "nav-link" to='/Home'>HOME</Link>
                <Link className = "nav-link" to='/Forum'>FORUM</Link> 
                <Link className = "nav-link" to='/Glossary'>GLOSSARY</Link>
                <Link className = "nav-link" to='/About'>ABOUT</Link>
                <Link className = "nav-link-last" to='/Schedule'>SCHEDULE</Link>
                <UserButton></UserButton>
            </div>

        </div>
    )
};

export default NavBar;
