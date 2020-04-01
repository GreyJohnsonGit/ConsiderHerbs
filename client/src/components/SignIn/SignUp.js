import React, {useState} from 'react'
import { MdClose } from 'react-icons/md';
import Axios from 'axios';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import {useHistory} from 'react-router-dom';
import './SignIn.css';
import config from '../../config.js';

const SignUp = () =>{
    const history = useHistory();
    const [signedUp, setSignedUp] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [problem, setProblem] = useState('');

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
    const signedUpHandleChange = event => {
        setSignedUp(!signedUp);
    }

    const attemptLogin = event => {
        event.preventDefault();
        if(password===confirmPassword){
        Axios.post(
            config.address + '/api/Authentication/SignUp',
            {
                username: username,
                email: email,
                password: password,
                method: 'Email'
            },
            {}
        )
        .then(res => {
            console.log(res.data);
            if(!res.data.success){
                setProblem(res.data.reason)
            }else{
                setProblem("")
                setEmail("")
                setPassword("")
                setUsername("")
                setConfirmPassword("")
                history.push('home')
            }
        })
        .catch(err => {
            console.error(err)
        });
    }else{
        setProblem("Password does not match")
    }
    }

    const responseGoogle = (response) => {
        console.log(response);
        let profile = response.getBasicProfile();
        console.log('Name: ' + profile.getName());
        console.log("Email: " + profile.getEmail());
        //let id_token = response.getAuthResponse().id_token;
        Axios.post(
            config.address + '/api/Authentication/SignUp',
            {
                username: profile.getName(),
                email: profile.getEmail(),
                password: profile.getEmail(),
                method: 'Gmail'
            },
            {}
        )
        .then(res => {
            console.log(res.data);
            if(!res.data.success){
                setProblem(res.data.reason)
            }else{
                history.push('home')
            }
        })
        .catch(err => {
            console.error(err)
        });
    }

    const responseFacebook = (profile) => {
        console.log(profile);
        console.log('Name: ' + profile.name);
        console.log("Email: " + profile.email);
        Axios.post(
            //'https://consider-herbs.herokuapp.com/api/Authentication/SignUp', //DEBUG ADDRESS
            'http://localhost:5000/api/Authentication/SignUp', ///////For running locally
            {
                username: profile.name,
                email: profile.email,
                password: profile.email,
                method: 'Facebook'
            },
            {}
        )
        .then(res => {
            console.log(res.data);
            if(!res.data.success){
                setProblem(res.data.reason)
            }else{
                history.push('home')
            }
        })
        .catch(err => {
            console.error(err)
        });
    }
   
    return(
        <div>
        { signedUp ? 
            <div>
                <div className='message-popup'>
                    <div className='message-inner'>
                        <MdClose className='new-thread-close-icon' size='1em' onClick={signedUpHandleChange} />
                        <form >
                            <div> You're all set!  </div>
                        </form>
                    </div>
                </div>
            </div>

        : null}

           <div className = "green-bar"> &nbsp; </div>
            <form className = "input-container"> 
                <font size="7"> Sign Up </font>
                <input placeholder="Username" className="enter" value={username} onChange={usernameHandleChange} type="text" required/>
                <input placeholder="Email" className="enter" value={email} onChange={emailHandleChange} type="text" required/>
                <input placeholder="Password" className="enter" value={password} onChange={passwordHandleChange} type="password" required/>
                <input placeholder="Confirm Password" className="enter" value={confirmPassword} onChange={confirmPasswordHandleChange} type="password" required/>


                <button type = "submit" className = "sign-in" onClick={attemptLogin}> Sign Up </button>
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
                <div className = "detail"> Login with your social media account </div>

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

                <div className="redirect">

                </div>

            </div>
            
            
        </div>
    )
}

export default SignUp;