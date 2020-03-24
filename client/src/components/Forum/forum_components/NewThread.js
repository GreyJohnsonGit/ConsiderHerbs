import React from 'react';
import { MdClose } from 'react-icons/md';

const NewThread = (props) => {
    return (
        <div className='new-thread-popup'>
            <div className='new-thread-inner'>
                <MdClose className='new-thread-close-icon' size='2em' onClick={props.closeFn} />
                <form action='/Forum/threadId'>
                    <label for='title'>Title</label>
                    <input type='text' id='title'/>
                    <label for='body'>Body</label>
                    <textarea rows='5' id='body'/>
                    <button type='submit'>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default NewThread;