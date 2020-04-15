import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import './Products.css';
import tea from './assets/tea.png';

const Products =()=>{
    const [showPopup, setShowPopup] = useState(0);
    const [mode, setMode] = useState('');
    let [typed, typedUpdate]=useState('')

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState([]);
    const [type, setType] = useState('');

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
        setType('');
        setMode('new');
        toggleShowPopup();
    }

    return(
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

                    <div id="grid-container">
                        <div id="grid-item"> 
                            <div id="product-image">&nbsp;</div>
                            <div id="name"> Product Name </div>
                            <div id="description"> Product Description, Lorem ipsum dolor sit amet, consectetur adipiscing elit, aliqua... </div>
                            <div id="price"> $8.62 </div>
                        </div>
                        <div id="grid-item"> 
                            <div id="product-image">&nbsp;</div>
                            <div id="name"> Product Name </div>
                            <div id="description"> Product Description, Lorem ipsum dolor sit amet, consectetur adipiscing elit, aliqua... </div>
                            <div id="price"> $8.62 </div>
                        </div>
                        <div id="grid-item"> 
                            <div id="product-image">&nbsp;</div>
                            <div id="name"> Product Name </div>
                            <div id="description"> Product Description, Lorem ipsum dolor sit amet, consectetur adipiscing elit, aliqua... </div>
                            <div id="price"> $8.62 </div>
                        </div>
                    </div>
                </div>

                <div className="affiliate-products">
                    <div id="title-wrapper">
                        <div id="title"> Affiliate Products </div>
                        <hr/>
                    </div>

                    <div id="grid-container">
                        <div id="grid-item"> 
                            <div id="product-image">&nbsp;</div>
                            <div id="name"> Product Name </div>
                            <div id="description"> Product Description, Lorem ipsum dolor sit amet, consectetur adipiscing elit, aliqua... </div>
                            <div id="price"> $8.62 </div>
                        </div>
                        <div id="grid-item"> 
                            <div id="product-image">&nbsp;</div>
                            <div id="name"> Product Name </div>
                            <div id="description"> Product Description, Lorem ipsum dolor sit amet, consectetur adipiscing elit, aliqua... </div>
                            <div id="price"> $8.62 </div>
                        </div>
                        <div id="grid-item"> 
                            <div id="product-image">&nbsp;</div>
                            <div id="name"> Product Name </div>
                            <div id="description"> Product Description, Lorem ipsum dolor sit amet, consectetur adipiscing elit, aliqua... </div>
                            <div id="price"> $8.62 </div>
                        </div>
                    </div>
                </div>

                <div className="suggested-products">
                    <div id="title-wrapper">
                        <div id="title"> Suggested Products </div>
                        <hr/>
                    </div>

                    <div id="grid-container">
                        <div id="grid-item"> 
                            <div id="product-image">&nbsp;</div>
                            <div id="name"> Product Name </div>
                            <div id="description"> Product Description, Lorem ipsum dolor sit amet, consectetur adipiscing elit, aliqua... </div>
                            <div id="price"> $8.62 </div>
                        </div>
                        <div id="grid-item"> 
                            <div id="product-image">&nbsp;</div>
                            <div id="name"> Product Name </div>
                            <div id="description"> Product Description, Lorem ipsum dolor sit amet, consectetur adipiscing elit, aliqua... </div>
                            <div id="price"> $8.62 </div>
                        </div>
                        <div id="grid-item"> 
                            <div id="product-image">&nbsp;</div>
                            <div id="name"> Product Name </div>
                            <div id="description"> Product Description, Lorem ipsum dolor sit amet, consectetur adipiscing elit, aliqua... </div>
                            <div id="price"> $8.62 </div>
                        </div>
                    </div>
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
            
            <div id="spacer"> &nbsp; </div>

        </div>
        
    );
}

export default Products;