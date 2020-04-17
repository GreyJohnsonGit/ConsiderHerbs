import React, { useState } from 'react';
import './Profile.css';
import {useCookies} from 'react-cookie';
import AdminPopup from '../Admin/AdminPopup';

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
    const [cookies, removeCookie] = useCookies([]);
    const [showPopup,setShowPopup] = useState(0);

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
                        <button type='button'>UPGRADE ACCOUNT</button>
                    </div>
                )
            case 2:
                return (
                    <div>
                        <div className='profile-account-type'>
                            <div id='label'>Account Type</div>
                            <div id='type'>Subscriber</div>
                        </div>
                        <button type='button'>UNSUBSCRIBE</button>
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
                Hello, {props.user.username}
            </div>

            <div className='profile-container'>
                <div className='profile-column-container'>
                    <div className='profile-column-1'>
                        <form>
                            <label for='username'>Username</label>
                            <input type='text' id='username' />
                            <label for='email'>Email</label>
                            <input type='text' id='email' />
                            <label for='password'>Password</label>
                            <input type='text' id='password' />
                            <label for='password'>Verify Password</label>
                            <input type='text' id='verify-password' />
                            <button type='button'>CHANGE PASSWORD</button>
                        </form>
                        {accountType(props.user.userLevel)}
                    </div>
                    <div className='profile-column-2'>
                        Your Forum Posts
                        <div className='profile-thread-preview-container'>
                            {props.user.userLevel == 0 ? 
                                <div className='profile-thread-preview-empty'>
                                    <div>Oops... You don't have any posts yet!</div>
                                    <a href='/Forum'>GO TO FORUM</a>
                                </div>
                                :
                                <div>
                                    { ThreadList.map((thread) => {
                                        return (
                                            <div className='profile-thread-preview'>
                                                <div id='title'>{thread.title}</div>
                                                <div id='body'>{thread.body}</div>
                                            </div>
                                        )
                                    })}
                                </div>
                            }
                        </div>
                    </div>
                </div>

                { props.user.userLevel <= 3 ? 
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

            { !props.user.isLoggedIn ?
            <div className='profile-sign-out'>
                <a href='/Home' onClick={(e) => {
                    console.log('link was clicked');
                    removeCookie('session');
                    props.setUser({
                        isLoggedIn: false,
                        userLevel: 0,
                        username: 'Anon'
                    }); 
                }}>SIGN OUT</a>
            </div>
            : null }
        </div>
    )
}

export default Profile;