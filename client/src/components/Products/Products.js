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
import {useCookies} from 'react-cookie'
import { set } from 'mongoose';

import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import {CardElement} from '@stripe/react-stripe-js';

const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");
const CARD_ELEMENT_OPTIONS = {
    style: {
        base: {
            color: "#363636",
            fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
            fontSmoothing: "antialiased",
            fontSize: "20px",
            backgroundColor: '#ededed',
            "::placeholder": {
                color: "#a0a0a0",
            },
        },
        invalid: {
            color: "#fa755a",
            iconColor: "#fa755a",
        },
    },
};


const Products =(props)=>{
    const [showPopup, setShowPopup] = useState(0);
    const [mode, setMode] = useState('');
    const [typed, typedUpdate]=useState('')
    const [cookies] = useCookies(['user']);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState();
    const [type, setType] = useState('');
    const [link, setLink] = useState('');
    const [buy,setBuy] = useState(0);

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
            var fileReader = new FileReader();
            fileReader.readAsDataURL(event.target.files[0]);
            fileReader.onloadend = function() {
                console.log(fileReader.result);
                setImage(fileReader.result);
            }

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
        setTitle(entry.name);
        setDescription(entry.description);
        setPrice(entry.price);
        setImage(entry.image);
        setType(entry.type);
        setLink(entry.link);
        setMode('edit');
        toggleShowPopup();
    };
    const toggleNewEntry = () => {
        setTitle('');
        setDescription('');
        setPrice('');
        setImage('');
        setLink('');
        setType('ConsiderHerbs');
        setMode('new');
        toggleShowPopup();
    };
    const toggleView = (entry) => {
        setBuy(0);
        setTitle(entry.name);
        setDescription(entry.description);
        setPrice(entry.price);
        setImage(entry.image);
        setType(entry.type);
        setLink(entry.link);
        setMode('view');
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
                    type: type,
                    link: link,
                    image: image
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
                    type: type,
                    link: link,
                    image: image
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
        <div className="Products">
            <AdminPopup closeFn={toggleShowPopup} showPopup={showPopup}>
                {mode === 'view' ?
                    <div className='product-view-container'>
                        <img src={image} width='305px' />
                        <div className='product-view-text'>
                            <h4>{title}</h4>
                            {description}
                            <h5>${price}</h5>
                            { !buy ? 
                                <button type='button' className='product-buy-button' onClick={() => setBuy(1)}>BUY</button>
                            :
                                <Elements stripe={stripePromise}>
                                    <form>
                                        <div className='profile-payment-entries'>
                                            <CardElement options={CARD_ELEMENT_OPTIONS} className='profile-payment-cc'/>
                                            <input 
                                                type='text' 
                                                size='5'
                                                maxLength='5'
                                                className='profile-payment-zip' 
                                                placeholder='ZIP' 
                                            />
                                        </div>
                                        <button type='submit' className='profile-payment-submit'>Submit</button>
                                    </form>
                                </Elements>
                            }
                        </div>
                    </div>
                :
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
                        <input type="file" id='title' onChange={handleImage} required/>

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
                }
            </AdminPopup>

            <div className="products-page">
                <div className="column-1">
                    <div className = "product-search">
                        <form>
                            <input type="text" placeholder="Search Products..." 
                                onChange={(event)=>{typedUpdate(event.target.value)}}
                            />
                            <button type="submit" onClick={searchTerm}>Search </button>
                            { cookies.user.userLevel === 3 ? 
                            <button type='button' className='admin-button' onClick={toggleNewEntry}>New</button> :
                            null}
                        </form>
                    </div>

                    <div className="consider-herbs-products">
                        <div id="title-wrapper">
                            <div id="title"> Consider Herbs Products </div>
                            <hr/>
                        </div>
                        <ConsiderProducts typed={typed} editFn={toggleEdit} viewFn={toggleView} userLevel={cookies.user.userLevel}/>
                    </div> 

                    <div className="affiliate-products">
                        <div id="title-wrapper">
                            <div id="title"> Affiliate Products </div>
                            <hr/>
                        </div>
                        <AffiliatedProducts typed={typed} editFn={toggleEdit} userLevel={cookies.user.userLevel}/>
                    </div>

                    <div className="suggested-products">
                        <div id="title-wrapper">
                            <div id="title"> Suggested Products </div>
                            <hr/>
                        </div>
                        <SuggestedProducts typed={typed} editFn={toggleEdit} userLevel={cookies.user.userLevel}/>
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