import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import Axios from 'axios';
//import GoogleLogin from 'react-google-login';

import './SignIn.css';

const SignIn =()=>{
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    //const [signedUp, setSignedUp] = useState(false);

    const usernameHandleChange = (event) => {
        setUsername(event.target.value);
    }
    const passwordHandleChange = event => {
        setPassword(event.target.value);
    }
    const attemptLogin = event => {
        Axios.post(
            'https://consider-herbs.herokuapp.com/api/Authentication/SignIn',
            {
                username: username,
                password: password,
                method: 'email',
            },
            {}
        )
        .then(res => {
            console.log(res.data);
        })
        .catch(err => {
            console.error(err)
        });
        event.preventDefault();
    }

    return(
        <div>
           <div className = "green-bar"> &nbsp; </div>
            <form className="input-container" onSubmit={attemptLogin}> 
                <font size="7"> Sign In </font>
                <input placeholder="Username" className="enter" value={username} onChange={usernameHandleChange} type="text" required/>
                <input placeholder="Password" className="enter" value={password} onChange={passwordHandleChange} type="password" required/>

                <button type = "submit" className = "sign-in"> Sign In </button>

                <div className = "or">
                    <hr size = "3"/>
                    <div> OR </div>
                    <hr size = "3"/>
                </div>
            </form>
            <div className = "blank-container">
                <div className = "detail"> Login with your social media account </div>

                <div className = "button-container">
                    <button type = "submit" className = "facebook"> Facebook </button>
                    <button type = "submit" className = "google"> Google </button>
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