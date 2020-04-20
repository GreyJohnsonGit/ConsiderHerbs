import React, { useState } from 'react';
import './Profile.css';
import {useCookies} from 'react-cookie';
import AdminPopup from '../Admin/AdminPopup';
import {useHistory} from 'react-router-dom';
import Axios from 'axios'
import config from '../../config.js'
import Async from 'react-async';;

const dummyThread = {
    threadId: 'threadId',
    userId: 'userId',
    title: 'Some Thread',
    user: '@JaneDoe',

    // eslint-disable-next-line
    body: 'Lorem ipsum dolor sit amet, \
            consectetur adipiscing elit, sed \
            do eiusmod tempor incididunt ut \
            labore et dolore magna aliqua. Ut enim ad minim veniam, \
            quis nostrud exercitation ullamco laboris nisi ut aliquip \
            ex ea commodo consequat. Duis aute irure dolor in reprehenderit \
            in voluptate velit esse cillum dolore eu fugiat nulla pariatur. \
            Excepteur sint occaecat cupidatat non proident, sunt in culpa\
            qui officia deserunt mollit anim id est laborum.Duis aute irure \
            dolor in reprehenderit in voluptate velit esse cillum dolore eu \
            fugiat nulla pariatur. Excepteur sint occaecat cupidatat non \
            proident, sunt in culpa qui officia deserunt mollit anim id \
            est laborum.',
    likes: 0,
    replies: []
}

const dummyUser = {
    username : 'Some_User',
    usertype : 'User',
    email : 'something@email.com',
    password : 'password',
    id :  'id'
}

let ThreadList = Array(7).fill(dummyThread);
let UserList = Array.apply(null, new Array(10)).map((user,i) => {
    return {
        username : 'Some_User'+i.toString(),
        usertype : 'User',
        email : 'something@email.com',
        password : 'password',
        id :  'id'
    }
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
    const [newPasswordVerify, setNewPasswordVerify] = useState('')

    const handleOldPasswordChange = (event) => {
        setOldPassword(event.target.value)
    }
    const handleNewPasswordChange = (event) => {
        setNewPassword(event.target.value)
    }
    const handleNewPasswordVerifyChange = (event) => {
        setNewPasswordVerify(event.target.value)
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

    const toggleShowPopup = () => {
        setShowPopup(!showPopup);
    }

    const accountType = (level) => {
        switch (level) {
            case 0:
                return (
                    <div>
                        <div className='profile-account-type'>
                            <div id='label'>Account Type</div>
                            <div id='type'>Anonymous User</div>
                        </div>
                        <button type='button'>SIGN UP</button>
                    </div>
                )
            case 1:
                return (
                    <div>
                        <div className='profile-account-type'>
                            <div id='label'>Account Type</div>
                            <div id='type'>User</div>
                        </div>
                        <button onClick={toggleSubscribe}>UPGRADE ACCOUNT</button>
                    </div>
                )
            case 2:
                return (
                    <div>
                        <div className='profile-account-type'>
                            <div id='label'>Account Type</div>
                            <div id='type'>Subscriber</div>
                        </div>
                        <button onClick={toggleSubscribe}>UNSUBSCRIBE</button>
                    </div>
                )
            case 3:
                return (
                    <div>
                        <div className='profile-account-type'>
                            <div id='label'>Account Type</div>
                            <div id='type'>Admin</div>
                        </div>
                    </div>
                )
        }
    }


    return (
        <div>
            <AdminPopup showPopup={showPopup} closeFn={toggleShowPopup}>
                change account type
            </AdminPopup>

            <div className='profile-text-box'>
                Hello, {cookies.user.session.username}
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
                        {accountType(cookies.user.userLevel)}
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
                            <div className='profile-account-preview-container'>
                                {UserList.map((user) => {
                                    return (
                                        <div className='profile-account-preview'>
                                            <span id='username'>{user.username}</span>
                                            <a onClick={toggleShowPopup} id='usertype'>{user.usertype}</a>
                                        </div>
                                    )
                                })}
                            </div>
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