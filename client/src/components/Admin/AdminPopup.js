import React from 'react'
import './AdminPopup.css'
import { MdClose } from 'react-icons/md';

const AdminPopup = (props) => {
    return (
        <div>
        { props.showPopup ? 
            <div className='admin-popup'>
                <div className='admin-popup-inner'>
                    <MdClose className='admin-popup-close-icon' size='2em' onClick={props.closeFn} />
                    {props.children}
                </div>
            </div> : null }
        </div>
    )
}

export default AdminPopup