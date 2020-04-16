import React, {useState} from 'react';
import { MdClose } from 'react-icons/md';
import axios from 'axios';
import config from '../../../config.js'

// props.entry => entry being edited
// props.mode => 'edit' or 'new'

const GlossaryPopUp = (props) => {

    const [title, setTitle] = useState(props.entry.title);
    const [definition, setDefinition] = useState(props.entry.definition);
    const [usage, setUsage] = useState(props.entry.usage);

    const handleTitle = (event) => {
        setTitle(event.target.value);
    }
    const handleDefinition = (event) => {
        setDefinition(event.target.value);
    }
    const handleUsage = (event) => {
        setUsage(event.target.value);
    }

    const submitForm = (event) => {
        if(props.mode === 'edit') {
            axios.put(
                config.address + '/api/Glossary/' + props.entry.title,
                {
                    title: title,
                    definition: definition,
                    usage: usage,
                    user: props.user
                }
            )
            .then((res) => {
                console.log(res);
                props.closeFn();
            })
            .catch((err) => {
                console.error(err);
                props.closeFn();
            })
        }
        if(props.mode === 'new') {
            axios.post(
                config.address + '/api/Glossary/',
                {
                    title: title,
                    definition: definition,
                    usage: usage,
                    user: props.user
                }
            )
            .then((res) => {
                console.log(res);
                props.closeFn();
            })
            .catch((err) => {
                console.error(err);
                props.closeFn();
            })
        }
    }

    return (
        <div className='glossary-popup'>
            <div className='glossary-popup-inner'>
                <MdClose className='glossary-popup-close-icon' size='2em' onClick={props.closeFn} />
                <form onSubmit={submitForm}>
                    <label for='title'>Title</label>
                    <input type='text' id='title' value={title} onChange={handleTitle}/>

                    <label for='definition'>Defintion</label>
                    <textarea rows='3' id='definition' value={definition} onChange={handleDefinition}/>

                    <label for='usage'>Usage</label>
                    <textarea rows='3' id='usage' value={usage} onChange={handleUsage}/>

                    <button type='submit'>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default GlossaryPopUp;