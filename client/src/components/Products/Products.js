import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import './Products.css';
import tea from './assets/tea.png';
import AdminPopup from "../Admin/AdminPopup";
import axios from 'axios';
import config from '../../config.js';
import ConsiderProducts from './products_components/ConsiderProducts.js'
import AffiliatedProducts from './products_components/AffiliatedProducts.js'
import SuggestedProducts from './products_components/SuggestedProducts.js'


const Products =(props)=>{
    const [showPopup, setShowPopup] = useState(0);
    const [mode, setMode] = useState('');
    let [typed, typedUpdate]=useState('')

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState([]);
    const [type, setType] = useState('');
    const [link, setLink] = useState('');

    const handleTitle = (event) => {
        setTitle(event.target.value);
    }
    const handleDescription = (event) => {
        setDescription(event.target.value);
    }
    const handlePrice = (event) => {
        setPrice(event.target.value);
    }
    const handleImage = (event) => {
        setImage(event.target.value);
    }
    const handleType = (event) => {
        setType(event.target.value);
    }
    const handleLink = (event) => {
        setLink(event.target.value);
    }
    
    const searchTerm=(prop)=>{
        prop.preventDefault()
    }

    const toggleShowPopup = () => {
        setShowPopup(!showPopup);
    };
    const toggleEdit = (entry) => {
        setTitle(entry.title);
        setDescription(entry.definition);
        setPrice(entry.usage);
        setImage(entry.title);
        setType(entry.type);
        setMode('edit');
        toggleShowPopup();
    };
    const toggleNewEntry = () => {
        setTitle('');
        setDescription('');
        setPrice('');
        setImage('');
        setType('ConsiderHerbs');
        setMode('new');
        toggleShowPopup();
    }

    const submitForm = (event) => {
        if(mode === 'edit') {
            axios.put(
                config.address + '/api/Product/' + title,
                {
                    name: title,
                    description: description,
                    price: price,
                    type: type
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
            axios.post(
                config.address + '/api/Product/',
                {
                    name: title,
                    description: description,
                    price: price,
                    type: type
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

    return(
        <div>
            <AdminPopup closeFn={toggleShowPopup} showPopup={showPopup}>
                    <form onSubmit={submitForm}>
                        <label htmlFor='type'>What Type of Product is This?</label>
                        <select
                            onChange={handleType}
                            id='user-level'>
                            <option value='ConsiderHerbs'>Consider Herbs</option>
                            <option value='Affiliate'>Affiliate</option>
                            <option value='Suggested'>Suggested</option>
                        </select>

                        <label htmlFor='title'>*Name</label>
                        <input type='text' id='title' value={title} onChange={handleTitle} required/>

                        <label htmlFor='image'>*Image</label>
                        <input type="file" id='title' value={image} onChange={handleImage} required/>

                        <label htmlFor='description'>*Description</label>
                        <textarea value={description} id='title' onChange={handleDescription} required/>

                        {type === "ConsiderHerbs" ? 
                            <div>
                                <label htmlFor='price'>*Price</label>
                                <br/>
                                <input type='text' id='title' value={price} onChange={handlePrice} required style={{width:"100%"}}/> 
                            </div>
                            :
                            <div>
                                <label htmlFor='price'>Price</label> <br/>
                                <input type='text' id='title' value={price} onChange={handlePrice} style={{width:"100%"}}/>
                                <br/>
                                <label htmlFor='link'>*Link</label><br/>
                                <input type='text' id='title' value={link} onChange={handleLink} required style={{width:"100%"}}/>
                            </div>
                        }

                        <button type='submit' id="admin-button">Submit</button>
                    </form>
            </AdminPopup>

            <div className="products-page">
                <div className="column-1">
                    <div className = "product-search">
                        <form>
                            <input type="text" placeholder="Search Products..." 
                                onChange={(event)=>{typedUpdate(event.target.value)}}
                            />
                            <button type="submit" onClick={searchTerm}>Search </button>
                            <button type='button' className='admin-button' onClick={toggleNewEntry}>New</button>
                        </form>
                    </div>

                    <div className="consider-herbs-products">
                        <div id="title-wrapper">
                            <div id="title"> Consider Herbs Products </div>
                            <hr/>
                        </div>
                        <ConsiderProducts typed={typed}/>
                    </div> 

                    <div className="affiliate-products">
                        <div id="title-wrapper">
                            <div id="title"> Affiliate Products </div>
                            <hr/>
                        </div>
                        <AffiliatedProducts typed={typed}/>
                    </div>

                    <div className="suggested-products">
                        <div id="title-wrapper">
                            <div id="title"> Suggested Products </div>
                            <hr/>
                        </div>
                        <SuggestedProducts typed={typed}/>
                    </div>                
                </div>

                <div className="column-2"> 
                    <div id="sticky-container">

                        <div id="nav-bar-container">
                            <div id="bar">&nbsp;</div>
                            <div id="nav-bar">
                                <div> Consider Herbs</div>
                                <div> Affiliate </div>
                                <div> Suggested </div>
                            </div>
                        </div>

                        <div className="side-image-container">
                            <img src={tea} id="image"></img>
                        </div>

                    </div>
                </div>
                
                <div id="spacer" style={{zIndex:"99"}}> &nbsp; </div>

            </div>
        </div>
        
    );
}

export default Products;