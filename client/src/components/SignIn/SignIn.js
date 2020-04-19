import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import Axios from 'axios';
import config from '../../config.js'
import {useHistory} from 'react-router-dom';
import {useCookies} from 'react-cookie';

import './SignIn.css';

const SignIn = (props) => {
    const history = useHistory();
    const [cookies, setCookie] = useCookies(['user']);
    const [problem, setProblem] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    if(cookies && cookies.user.userLevel) {
        history.push('home');
    }

    const usernameHandleChange = (event) => {
        setUsername(event.target.value);
    }
    const passwordHandleChange = event => {
        setPassword(event.target.value);
    }

    const attemptLogin = (_username, _password, _method) => {
        Axios.post(
            config.address + '/api/Authentication/SignIn',
            {
                username: _username,
                password: _password,
                method: _method
            }
        )
        .then(res => {
            if(res.data.success) {
                setCookie('user', res.data.user, {
                    path: '/',
                    expires: new Date(res.data.user.session.expireTime) 
                });
                props.toggleUserState();
            }
            else {
                setProblem(res.data.error);
            }
        })
        .catch(err => {
            console.error(err)
        });
    }

    const responseLoginForm = (event)  => {
        event.preventDefault();
        attemptLogin(username, password, 'Email');        
    }
    const responseGoogle = (response) => {
        attemptLogin(response.getBasicProfile().username, response.googleId, 'Google');
    }
    const responseFacebook = (profile) => {
        attemptLogin(profile.name, profile.email, 'Facebook');
    }
    
    return(
        <div>
        <div id="fb-root"></div>
        <script async defer crossOrigin="anonymous" src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v6.0&appId=282495236070074"></script> 
           <div className = "green-bar"> &nbsp; </div>
            <form className="input-container" onSubmit={responseLoginForm}> 
                <font size="7"> Sign In </font>
                <input placeholder="Username" className="enter" value={username} onChange={usernameHandleChange} type="text" required/>
                <input placeholder="Password" className="enter" value={password} onChange={passwordHandleChange} type="password" required/>

                <button type = "submit" className = "sign-in"> Sign In </button>
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
                <div className = "detail"> Sign in with an external account </div>
                <div className = "button-container">
                    {/* <div class="fb-login-button" data-width="" data-size="medium" data-button-type="login_with" data-layout="default" data-auto-logout-link="true" data-use-continue-as="ftrue"></div>*/}
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
            </div>
            <div className="redirect">
                <div className = "redirect-signup"> Don't have an account?  
                    <Link className="sign-up" to="/SignUp"> Sign up here!</Link> 
                </div>
            </div>
        </div>
    );

}
export default SignIn;