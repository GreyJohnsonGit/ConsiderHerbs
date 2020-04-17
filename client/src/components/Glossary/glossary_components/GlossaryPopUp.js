import React from 'react';
import { MdClose } from 'react-icons/md';

// props.entry => entry being edited
// props.mode => 'edit' or 'new'

const GlossaryPopUp = (props) => {
    return (
        <div className='glossary-popup'>
            <div className='glossary-popup-inner'>
                <MdClose className='glossary-popup-close-icon' size='2em' onClick={props.closeFn} />
                <form action='/Glossary'>
                    <label for='title'>Title</label>
                    <input type='text' id='title' value={props.entry.title} />

                    <label for='definition'>Defintion</label>
                    <textarea rows='3' id='definition' value={props.entry.definition}/>

                    <label for='usage'>Usage</label>
                    <textarea rows='3' id='usage' value={props.entry.usage}/>

                    { props.mode === 'edit' ? <button type='submit'>Submit</button> : <button type='submit'>Submit</button>}
                </form>
            </div>
        </div>
    )
}

export default GlossaryPopUp;