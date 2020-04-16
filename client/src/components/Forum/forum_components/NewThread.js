import React, { useState } from 'react';
import { MdClose } from 'react-icons/md';
import { useForm } from 'react-hook-form';
import TagList from './TagList.js';


const NewThread = (props) => {

    const { register, handleSubmit, reset } = useForm();
    const [ tags, setTags ] = useState([]);


    const onSubmit = data => {
        var temp = tags;
        temp.push(data.tag);
        setTags(temp);
        
        reset();
    };

    return (
        <div className='new-thread-popup'>
            <div className='new-thread-inner'>
                <form action='/Forum/threadId'>
                    <div id='title-container'>
                        <span id="dot"></span>
                        <div id='create_title'> Hello User, Create Your Thread </div>
                        <MdClose className='new-thread-close-icon' size='2em' onClick={props.closeFn} />
                    </div>
                    <input type='text' id='title' placeholder='Title...' required='true'/>
                    <textarea rows='5' id='body' placeholder='Type post here...' required='true'/>

                    <form id='tag-form' onSubmit={handleSubmit(onSubmit)}>
                        <input type='text' name='tag' id='title' ref={register} placeholder='Add tags to make your thread more discoverable...'/>
                    </form>

                    <TagList tags={tags} setTags={setTags}/>

                    <button type='submit'>Post</button>
                </form>
            </div>
        </div>
    )
}

export default NewThread;