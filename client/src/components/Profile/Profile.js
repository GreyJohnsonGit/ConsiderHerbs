import React, { useState } from 'react';
import './Profile.css';
import {useCookies} from 'react-cookie';
import AdminPopup from '../Admin/AdminPopup';
import {useHistory} from 'react-router-dom';
import Axios from 'axios'
import config from '../../config.js'
import Async from 'react-async';

import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import {CardElement} from '@stripe/react-stripe-js';

const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

const CARD_ELEMENT_OPTIONS = {
    style: {
        base: {
            color: "#363636",
            fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
            fontSmoothing: "antialiased",
            fontSize: "20px",
            backgroundColor: '#ededed',
            "::placeholder": {
                color: "#a0a0a0",
            },
        },
        invalid: {
            color: "#fa755a",
            iconColor: "#fa755a",
        },
    },
};

const defaultViewData = Object.freeze({
    username: '',
    userLevel: 0
});

const Profile = (props) => {
    const [cookies, setCookie, removeCookie] = useCookies(['user'])
    const history = useHistory();
    if(!cookies.user || !cookies.user.userLevel) {
        history.push('SignIn');
    }

    const [showPopup,setShowPopup] = useState(0)
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [newPasswordVerify, setNewPasswordVerify] = useState('');
    const [viewData,setViewData] = useState(defaultViewData);
    const [mode,setMode] = useState('');

    const handleOldPasswordChange = (event) => {
        setOldPassword(event.target.value)
    }
    const handleNewPasswordChange = (event) => {
        setNewPassword(event.target.value)
    }
    const handleNewPasswordVerifyChange = (event) => {
        setNewPasswordVerify(event.target.value)
    }
    const handleViewData = (e) => {
        setViewData({
            ...viewData,
            [e.target.name]: parseInt(e.target.value)
        })
    }

    const changePassword = (event) => {
        if(event.target.newPassword.value === event.target.newPasswordVerify.value) {
            Axios.post(
                config.address + '/api/Authentication/ChangePassword/',
                {
                    oldPassword: event.target.oldPassword.value,
                    newPassword: event.target.newPassword.value,
                    session: cookies.user.session 
                }
            )
            .then((response) => {
                console.log(response.data);
            })
            .catch((err) => {
                console.error(err);
            })
        }
    }

    const getUserThread = () => {
        return Axios.get(
            config.address + '/api/Forum/@' + cookies.user.session.username + '/posts/'
        )
        .then((response) => {
            return response.data
        })
        .catch((err) => {
            console.error(err)
            return err
        })
    }

    const getAllUsers = () => {
        return Axios.get(
            config.address + '/api/SignIn'
        )
        .then((response) => {
            //console.log(response.data);
            return response.data;
        })
        .catch((err) => {
            console.error(err)
            return err;
        })
    }

    const toggleSubscribe = () => {
        Axios.post(
            config.address + '/api/Authentication/ToggleSubscribe/',
            {
                username: cookies.user.session.username
            }
        )
        .then((response) => {
            console.log(response)
            if(response.data.success) {
                console.log(response.data.user)
                setCookie('user', response.data.user, {expires: new Date(response.data.user.session.expireTime)})
                props.toggleUserState()
            }
        })
        .catch(console.error)
    }

    const updateUserLevel = (e) => {
        Axios.post(
            config.address + '/api/Authentication/ChangeLevel',
            { ...viewData }
        )
        .then((res) => {
            if (res.data.success) {
                toggleShowPopup();
            }
        })
        .catch((err) => {
            console.error(err);
        })
    }

    const toggleShowPopup = () => {
        setShowPopup(!showPopup);
    }

    const toggleAdminChange = (user) => {
        setMode('admin');
        setViewData({
            username: user.username,
            userLevel: user.userLevel
        });
        toggleShowPopup();
    }
    const toggleUpgradeAccount = () => {
        setMode('upgrade');
        toggleShowPopup();
    }

    const levelToType = (level) => {
        switch (level) {
            case 0:
                return 'Guest';
            case 1:
                return 'Subscriber';
            case 2:
                return 'Premium User';
            case 3:
                return 'Administrator';
            case 4:
                return 'Owner';
            default:
                return 'Guest*';
        }
    }
    const accountTypeElement = (level) => {
        switch (level) {
            case 0:
                return (
                    <div>
                        <div className='profile-account-type'>
                            <div id='label'>Account Type</div>
                            <div id='type'>Guest</div>
                        </div>
                        <button type='button'>SIGN UP</button>
                    </div>
                )
            case 1:
                return (
                    <div>
                        <div className='profile-account-type'>
                            <div id='label'>Account Type</div>
                            <div id='type'>Subscriber</div>
                        </div>
                        <button type='button' onClick={toggleUpgradeAccount}>UPGRADE ACCOUNT</button>
                    </div>
                )
            case 2:
                return (
                    <div>
                        <div className='profile-account-type'>
                            <div id='label'>Account Type</div>
                            <div id='type'>Premium Subscriber</div>
                        </div>
                        <button onClick={toggleSubscribe}>UNSUBSCRIBE</button>
                    </div>
                )
            case 3:
                return (
                    <div>
                        <div className='profile-account-type'>
                            <div id='label'>Account Type</div>
                            <div id='type'>Administrator</div>
                        </div>
                    </div>
                )
            case 4:
                return (
                    <div>
                        <div className='profile-account-type'>
                            <div id='label'>Account Type</div>
                            <div id='type'>Owner</div>
                        </div>
                    </div>
                )
        }
    }


    return (
        <div>
            <AdminPopup showPopup={showPopup} closeFn={toggleShowPopup}>
                { mode === 'admin' ? 
                    <form className='profile-manage-form' onSubmit={updateUserLevel}>
                        <div>
                            <span>{viewData.username}</span>
                            <select name='userLevel' onChange={handleViewData}>
                                {viewData.userLevel===0 ? <option value='0' selected={viewData.userLevel===0}>Guest</option> : null }
                                <option value='1' selected={viewData.userLevel===1}>Subscriber</option>
                                <option value='2' selected={viewData.userLevel===2}>Premium User</option>
                                <option value='3' selected={viewData.userLevel===3}>Administrator</option>
                                {typeof viewData.userLevel==='undefined' ? <option value='0' selected={typeof viewData.userLevel==='undefined'}>Guest</option> : null }
                            </select>
                        </div>
                        <button type='submit'>SUBMIT</button>
                    </form> 
                :
                    <div>
                        <div className='profile-payment-title'>
                            Subscription: $10/month
                        </div>
                        <Elements stripe={stripePromise}>
                            <form>
                                <div className='profile-payment-entries'>
                                    <CardElement options={CARD_ELEMENT_OPTIONS} className='profile-payment-cc'/>
                                    <input 
                                        type='text' 
                                        size='5'
                                        maxLength='5'
                                        className='profile-payment-zip' 
                                        placeholder='ZIP' 
                                    />
                                </div>
                                <button type='submit' className='profile-payment-submit' onClick={toggleSubscribe}>Submit</button>
                            </form>
                        </Elements>
                    </div>
                }
            </AdminPopup>

            <div className='profile-text-box'>
                Hello, {cookies.user.session ? cookies.user.session.username : 'error'}
            </div>

            <div className='profile-container'>
                <div className='profile-column-container'>
                    <div className='profile-column-1'>
                        <form onSubmit={changePassword}>
                            <label htmlFor='oldPassword'>Old Password</label>
                            <input type='text' id='oldPassword' value={oldPassword} onChange={handleOldPasswordChange}/>
                            <label htmlFor='newPassword'>New Password</label>
                            <input type='text' id='newPassword' value={newPassword} onChange={handleNewPasswordChange}/>
                            <label htmlFor='newPasswordVerify'>Verify New Password</label>
                            <input type='text' id='newPasswordVerify' value={newPasswordVerify} onChange={handleNewPasswordVerifyChange}/>
                            <button type='submit'>CHANGE PASSWORD</button>
                        </form>
                        {accountTypeElement(cookies.user.userLevel)}
                    </div>
                    <div className='profile-column-2'>
                        Your Forum Posts
                        <div className='profile-thread-preview-container'>
                            {cookies.user.userLevel == 0 ? 
                                <div className='profile-thread-preview-empty'>
                                    <div>Oops... You don't have any posts yet!</div>
                                    <a href='/Forum'>GO TO FORUM</a>
                                </div>
                                :
                                <div>
                                    <Async promiseFn={getUserThread}>
                                        {({data, err, isLoading}) => {
                                            if (isLoading) return "Loading...";
                                            if (err) return `Oops, something went wrong: ${err.message}`
                                            if (data && Array.isArray(data) && data.length > 0) {
                                                return data.map((thread) => {
                                                    return (
                                                        <div className='profile-thread-preview'>
                                                            <div id='title'>{thread.title}</div>
                                                            <div id='body'>{thread.body}</div>
                                                        </div>
                                                    )
                                                })
                                            }
                                            else {
                                                return (
                                                    <div className='profile-thread-preview-empty'>
                                                        <div>Oops... You don't have any posts yet!</div>
                                                        <a href='/Forum'>GO TO FORUM</a>
                                                    </div>
                                                )
                                            }
                                        }}
                                    </Async>
                                </div>
                            }
                        </div>
                    </div>
                </div>

                { cookies.user.userLevel >= 3 ? 
                    <div>
                        <div className='profile-manage-accounts-text'>
                            Manage Accounts
                        </div>
                        <div className='profile-manage-accounts'>
                            <input type='text' placeholder='Search Accounts...'></input>
                            <Async promiseFn={getAllUsers}>
                                {({data, err, isLoading}) => {
                                    if (isLoading) return "Loading...";
                                    if (err) return `Oops, something went wrong: ${err.message}`
                                    if (data && Array.isArray(data) && data.length > 0) {
                                        return (
                                            <div className='profile-account-preview-container'>
                                                {data.map((user) => {
                                                    return (
                                                        <div className='profile-account-preview'  onClick={() => toggleAdminChange(user)}>
                                                            <span id='username'>{user.username}</span>
                                                            <div id='usertype'>{levelToType(user.userLevel)}</div>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        );
                                    }
                                }}
                            </Async>
                        </div>
                    </div>
                : null }
            </div>

            {
            <div className='profile-sign-out'>
                <a href='/Home' onClick={(e) => {
                    removeCookie('user');
                    props.toggleUserState();
                }}>SIGN OUT</a>
            </div>
            }
        </div>
    )
}

export default Profile;