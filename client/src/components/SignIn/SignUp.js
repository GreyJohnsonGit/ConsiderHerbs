import React, {useState} from 'react'
//import { MdClose } from 'react-icons/md';
import Axios from 'axios';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import './SignIn.css';
import config from '../../config.js';
import {useCookies} from 'react-cookie';

const SignUp = (props) =>{
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const usernameHandleChange = event => {
        setUsername(event.target.value);
    }
    const emailHandleChange = event => {
        setEmail(event.target.value);
    }
    const passwordHandleChange = event => {
        setPassword(event.target.value);
    }
    const confirmPasswordHandleChange = event => {
        setConfirmPassword(event.target.value);
    }

    const [, setCookie, ] = useCookies([]);
    const [problem, setProblem] = useState('');
    const attemptLogin = (_username, _email, _password, _confirmPassword, _method) => {
        if(_password === _confirmPassword){
            Axios.post(
                config.address + '/api/Authentication/SignUp',
                {
                    username: _username,
                    email: _email,
                    password: _password,
                    method: _method
                }
            )
            .then(res => {
                if(res.data.success) {
                    setCookie('session', res.data.session, {
                        path: '/',
                        expires: new Date(res.data.session.expireTime) 
                    });
                    props.setLoggedIn(true);
                }
                else {
                    setProblem(res.data.reason);
                }
            })
            .catch(err => {
                console.error(err);
            });
        }
        else{
            setProblem("Password does not match");
        }
    }

    const responseSignInForm = (event) => {
        event.preventDefault();
        attemptLogin(username, email, password, confirmPassword, 'Email');
    }

    const responseGoogle = (response) => {
        attemptLogin(response.getBasicProfile().getName(), response.getBasicProfile().getEmail(), response.getBasicProfile().getEmail(), response.getBasicProfile().getEmail(), 'Google');
    }

    const responseFacebook = (profile) => {
        attemptLogin(profile.name, profile.email, profile.email, profile.email, 'Facebook');
    }

    return(
        <div className='sign-row-container'>
           <div className = "green-bar"> &nbsp; </div>
            <form className = "input-container"> 
                <font size="7"> Sign Up </font>
                <input placeholder="Username" className="enter" value={username} onChange={usernameHandleChange} type="text" required/>
                <input placeholder="Email" className="enter" value={email} onChange={emailHandleChange} type="text" required/>
                <input placeholder="Password" className="enter" value={password} onChange={passwordHandleChange} type="password" required/>
                <input placeholder="Confirm Password" className="enter" value={confirmPassword} onChange={confirmPasswordHandleChange} type="password" required/>
                <button type = "submit" className = "sign-in" onClick={responseSignInForm}> Sign Up </button>
                <div className = "error">
                    {problem}
                </div>
                <div className = "or">
                    <hr size = "3"/>
                    <div> OR </div>
                    <hr size = "3"/>
                </div>
            </form>
            <div className = "blank-container">
                <div className = "detail"> Sign up with an external account </div>
                <div className = "button-container">
                <FacebookLogin
                            
                            type = "submit" className = "facebook"
                            appId="282495236070074"
                            fields="name,email,picture"
                            callback={responseFacebook}
                            textButton= "Facebook"
                            icon="fa-facebook"
                            version = "6.0"
                        />
                    <GoogleLogin type = "submit" className="google"
                        buttonText="Google"
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        />
                </div>
                <div className="redirect"></div>
            </div>
        </div>
    )
}

export default SignUp;