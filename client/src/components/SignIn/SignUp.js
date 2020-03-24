import React, {useState} from 'react'
import { MdClose } from 'react-icons/md';
import './SignIn.css'

const SignUp = () =>{
    const [signedUp, setSignedUp]= useState(0) 
    
   const SigndUpUser =()=>{
        setSignedUp(!signedUp)
    }
   
    return(
        <div>
        { signedUp ? 
            <div>
                <div className='message-popup'>
                    <div className='message-inner'>
                        <MdClose className='new-thread-close-icon' size='1em' onClick={SigndUpUser} />
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
                <input placeholder="Username" className="enter" required/>
                <input type="password" placeholder="Password" className="enter" required/>
                <input type="password" placeholder="Corfirm Password" className="enter" required/>

                <button type = "submit" className = "sign-in" onClick={SigndUpUser}> Sign Up </button>

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

                <div className="redirect">

                </div>

            </div>
            
            
        </div>
    )
}

export default SignUp;