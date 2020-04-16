import React, { useState } from 'react';
import { MdClose } from 'react-icons/md';
import { useForm } from 'react-hook-form';
import TagList from './TagList.js';
import axios from 'axios';
import config from '../../../config.js'

/*
const dummyThread = {
    threadId: 'threadId',
    userId: 'userId',
    title: 'Some Thread',
    user: '@JaneDoe',
    body: 'Lorem ipsum dolor sit amet, \
            consectetur adipiscing elit, \
            sed do eiusmod tempor incididunt \
            ut labore et dolore magna aliqua. \
            Ut enim ad minim veniam, quis \
            nostrud exercitation ullamco \
            laboris nisi ut aliquip ex ea commodo consequat...',
    likes: 0,
    replies: []
}
*/

const NewThread = (props) => {

    const { register, handleSubmit, reset } = useForm();
    const [ title, setTitle ] = useState("");
    const [ body, setBody ] = useState("");
    const [ tags, setTags ] = useState([]);

    const addNewThread = () => {
        console.log("NEWNENWNW")
        axios.post(
            config.address + '/api/Forum/',
            {
                title: title,
                body: body,
                likes: 0,
                tags: tags
            }
        )
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.error(err);
        })

        console.log({
            title: title,
            body: body,
            likes: 0,
            tags: tags
        })
    }

    const onSubmit = data => {
        var temp = tags;
        temp.push(data.tag);
        setTags(temp);
        
        reset();
    };

    return (
        <div className='new-thread-popup'>
            <div className='new-thread-inner'>
                <form /*action='/Forum/threadId'*/>
                    <div id='title-container'>
                        <span id="dot"></span>
                        <div id='create_title'> Hello User, Create Your Thread </div>
                        <MdClose className='new-thread-close-icon' size='2em' onClick={props.closeFn} />
                    </div>
                    <input type='text' id='title' placeholder='Title...' value={title} onChange={ev => setTitle(ev.target.value)} required='true'/>
                    <textarea rows='5' id='body' placeholder='Type post here...' value={body} onChange={ev => setBody(ev.target.value)} required='true'/>

                    <form id='tag-form' onSubmit={handleSubmit(onSubmit)}>
                        <input type='text' name='tag' id='title' onChange={ev => setTags(ev.target.value.split(","))} ref={register} placeholder='Add tags to make your thread more discoverable...'/>
                    </form>

                    <TagList tags={tags} setTags={setTags}/>

                    <button /*type='submit'*/ onClick={addNewThread}>Post</button>
                </form>
            </div>
        </div>
    )
}

export default NewThread;