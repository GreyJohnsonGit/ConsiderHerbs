import './SignIn.css';

import React from 'react'

const SignIn =()=>{
    return(
        <div>
           <div className = "green-bar"> &nbsp; </div>
            <form className = "input-container"> 
                <font size="7"> Sign In </font>


                <input placeholder="Username" className="enter" required/>
                <input placeholder="Password" className="enter" required/>

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
            <div className = "redirect"> Don't have an account? Sign up here! </div>
        </div>
    );
}
export default SignIn;