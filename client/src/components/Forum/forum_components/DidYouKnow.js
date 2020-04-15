import React, {useState} from 'react';
import ForumImage from '../Forum_Image.jpg';
import PostInfo from './PostInfo.js';
import DidYouKnowImage from './assets/Did_You_Know_IMG.jpg';
import DidYouKnowContent from './DidYouKnowContent.js';
import DidYouKnowComments from './DidYouKnowComments.js';
import { Route, Switch, Link } from 'react-router-dom';
import config from '../../../config.js';
import AdminPopup from "../../Admin/AdminPopup";
import axios from 'axios';

const dummyPost = {
    postId: 'did i change?',
    title: 'Some Post',
    date: '01/01/2020',
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
    sources: ["Dean, Cornelia. Executive on a Mission: Saving the Planet. The New York Times, 22 May 2007, www.nytimes.com/2007/05/22/science/earth/22ander.html?_r=0. Accessed 29 May 2019."
            , "Ebert, Roger. Review of An Inconvenient Truth, directed by Davis Guggenheim. Ebert Digital LLC, 1 June 2006, www.rogerebert.com/reviews/an-inconvenient-truth-2006. Accessed 15 June 2019."],
    replies: []
}

const dummyComment = {
    threadId: 'threadId',
    userId: 'userId',
    user: '@some_user',
    body: 'Lorem ipsum dolor sit amet, \
            consectetur adipiscing elit, \
            sed do eiusmod tempor incididunt \
            ut labore et dolore magna aliqua. \
            Ut enim ad minim veniam, quis \
            nostrud exercitation ullamco \
            laboris nisi ut aliquip ex ea commodo consequat...',

}

const Comments = Array(3).fill(dummyComment);


const DidYouKnow = (props) => {

    const loadPost = () => {
        return axios.get(
            config.address + '/api/DidYouKnow/'
        )
        .then(res => {
            return res.data;
        })
        .catch(err => {
            console.error(err);
            return err;
        });
    }

    const [showPopup, setShowPopup] = useState(0);
    const [mode, setMode] = useState('');

    const [title, setTitle] = useState('');
    const [image, setImage] = useState([]);
    const [body, setBody] = useState('');

    const handleTitle = (event) => {
        setTitle(event.target.value);
    }
    const handleImage = (event) => {
        console.log(event);
        setImage([...image, event.target.files[0]]);
    }
    const handleBody = (event) => {
        setBody(event.target.value);
    }

    const toggleShowPopup = () => {
        setShowPopup(!showPopup);
    };
    const toggleEdit = (entry) => {
        setTitle(entry.title);
        setImage(entry.image);
        setBody(entry.body);
        setMode('edit');
        toggleShowPopup();
    };
    const toggleNewEntry = () => {
        setTitle('');
        setImage('');
        setBody('');
        setMode('new');
        toggleShowPopup();
    }

    const submitForm = (event) => {
        if(mode === 'edit') {
            axios.put(
                config.address + '/api/DidYouKnow/' + title,
                {
                    title: title,
                    image: image,
                    body: body
                }
            )
            .then((res) => {
                console.log(res);
                toggleShowPopup();
            })
            .catch((err) => {
                console.error(err);
                toggleShowPopup();
            })
        }
        if(mode === 'new') {
            console.log(title);
            axios.post(
                config.address + '/api/DidYouKnow/',
                {
                    title: title,
                    image: image,
                    body: body
                }
            )
            .then((res) => {
                console.log(res);
                toggleShowPopup();
            })
            .catch((err) => {
                console.error(err);
                toggleShowPopup();
            })
        }
    }

    return (
        
        <div>
            <div className="image-container">

                <div className="image-div">
                    <img src={ForumImage} className="forum-image"></img>
                </div>

            </div>

            <AdminPopup closeFn={toggleShowPopup} showPopup={showPopup}>
                <form onSubmit={submitForm}>
                    <label htmlFor='title'>Title</label>
                    <input type='text' id='title' value={title} onChange={handleTitle}/>

                    <label htmlFor='image'>Image</label>
                    <input type="file" rows='3' id='definition' value={image} onChange={handleImage}/>

                    <label htmlFor='body'>Body</label>
                    <textarea rows='3' id='usage' value={body} onChange={handleBody}/>

                    <button type='submit'>Submit</button>
                </form>
            </AdminPopup>
            
            <div className="dyk-spacer">&nbsp;</div>
            <button type='button' className='admin-button' onClick={toggleNewEntry} style={{marginLeft: "15%", marginRight: "100%", marginBottom: "10px", paddingRight:"20px", paddingLeft:"20px"}}>New</button>
            <a href={`/Forum`} className="did-you-know-back-button"> {"< Back"}</a>

            <PostInfo editFn={toggleEdit}/>
        </div>
    )
}

export default DidYouKnow;