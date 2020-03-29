import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import Axios from 'axios';

import './SignIn.css';

const SignIn = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [problem, setProblem] = useState('');
    //const [signedUp, setSignedUp] = useState(false);

    const usernameHandleChange = (event) => {
        setUsername(event.target.value);
    }
    const passwordHandleChange = event => {
        setPassword(event.target.value);
    }
    const attemptLogin = (event)  => {
        event.preventDefault();
        Axios.post(
            //'https://consider-herbs.herokuapp.com/api/Authentication/SignIn',
            'http://localhost:5000/api/Authentication/SignIn', ///////For running locally
            {
                username: username,
                password: password,
                method: 'Email',
            },
            {}
        )
        .then(res => {
            console.log("Axios respones: ", res.data);
            if(!res.data.success){
                setProblem(res.data.reason)
            }else{
                setProblem("")
            }            
        })
        .catch(err => {
            console.error(err)
        });
        
    }

    const responseGoogle = (response) => {
        console.log(response);
        let profile = response.getBasicProfile();
        console.log('Name: ' + profile.getName());
        console.log("Email: " + profile.getEmail());
        let id_token = response.getAuthResponse().id_token;
        Axios.post(
            //'https://consider-herbs.herokuapp.com/api/Authentication/SignIn',
            'http://localhost:5000/api/Authentication/SignIn', ///////For running locally
            {
                username: profile.getName(),
                password: profile.getEmail(),
                method: 'Gmail',
            },
            {}
        ).then(res => {
            console.log("Axios respones: ", res.data);
            if(!res.data.success){
                setProblem(res.data.reason)
            }else{
                setProblem("")
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
            //'https://consider-herbs.herokuapp.com/api/Authentication/SignIn',
            'http://localhost:5000/api/Authentication/SignIn', ///////For running locally
            {
                username: profile.name,
                password: profile.email,
                method: 'Facebook',
            },
            {}
        )
        .then(res => {
            console.log("Axios respones: ", res.data);
            if(!res.data.success){
                setProblem(res.data.reason)
            }else{
                setProblem("")
            }            
        })
        .catch(err => {
            console.error(err)
        });
    }
    
    return(
        <div>
            <div id="fb-root"></div>
        <script async defer crossOrigin="anonymous" src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v6.0&appId=282495236070074"></script> 
           <div className = "green-bar"> &nbsp; </div>
            <form className="input-container" onSubmit={attemptLogin}> 
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
                <div className = "detail"> Login with your social media account </div>

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