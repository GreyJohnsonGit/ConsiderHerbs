import './SignIn.css';
import React, {useState} from 'react'
import { Link } from 'react-router-dom'


const SignIn =()=>{
   
    return(
        <div>
           <div className = "green-bar"> &nbsp; </div>
            <form className = "input-container"> 
                <font size="7"> Sign In </font>
                <input placeholder="Username" className="enter" required/>
                <input type="password" placeholder="Password" className="enter" required/>

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
                    <Link className="sign-up" to="/SignIn/SignUp"> Sign up here!</Link> 
                </div>
                
            
            </div>
            
        </div>
    );
}
export default SignIn;