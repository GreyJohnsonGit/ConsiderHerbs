import React, {useState} from 'react';
import ForumImage from '../Forum_Image.jpg';
import PostInfo from './PostInfo.js';
import DidYouKnowImage from './assets/Did_You_Know_IMG.jpg';
import config from '../../../config.js';
import AdminPopup from "../../Admin/AdminPopup";
import axios from 'axios';
import {useCookies} from 'react-cookie';


const DidYouKnow = (props) => {
    const [showPopup, setShowPopup] = useState(0);
    const [mode, setMode] = useState('');
    const [cookies] = useCookies(['user']);
    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
    const [body, setBody] = useState('');
    const [sources, setSources] = useState('');

    const handleTitle = (event) => {
        setTitle(event.target.value);
    }
    const handleImage = (event) => {
        setImage(event.target.value);
    }
    const handleBody = (event) => {
        setBody(event.target.value);
    }
    const handleSources = (event) => {
        setSources(event.target.value);
    }

    const toggleShowPopup = () => {
        setShowPopup(!showPopup);
    };
    const toggleEdit = (entry) => {
        setTitle(entry.title);
        setImage(entry.image);
        setBody(entry.body);
        setSources(entry.sources);
        setMode('edit');
        toggleShowPopup();
    };
    const toggleNewEntry = () => {
        setTitle('');
        setImage('');
        setBody('');
        setSources('');
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
                    body: body,
                    sources: sources
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
                    body: body,
                    sources: sources
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
                    <input type='text' id='title' value={title} onChange={handleTitle} required/>

                    <label htmlFor='image'>Image</label>
                    <input type="file" rows='3' id='definition' value={image} onChange={handleImage}/>

                    <label htmlFor='body'>Body</label>
                    <textarea rows='3' id='usage' value={body} onChange={handleBody} required/>

                    <label htmlFor='sources'>Sources</label>
                    <textarea rows='3' id='usage' value={sources} onChange={handleSources}/>

                    <button type='submit'>Submit</button>
                </form>
            </AdminPopup>
            
            <div className="dyk-spacer">&nbsp;</div>

            {cookies.user.userLevel === 3 ? 
            <div>
            <button type='button' className='admin-button' onClick={toggleNewEntry} style={{marginLeft: "15%", marginBottom: "10px", paddingRight:"20px", paddingLeft:"20px"}}>New</button> <br/>
            </div>:
            null}
            
            <a href={`/Forum`} className="did-you-know-back-button"> {"< Back"}</a>

            <PostInfo editFn={toggleEdit} userLevel={cookies.user.userLevel}/>
        </div>
    )
}

export default DidYouKnow;