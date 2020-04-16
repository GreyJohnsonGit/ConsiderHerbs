import Async from 'react-async';
import Axios from 'axios';
import React, {useState} from 'react';
import config from '../../../config.js';

const loadProductInfo = () => {
    return Axios.get(
        config.address + '/api/Products/'
    )
    .then(res => {
        return res.data;
    })
    .catch(err => {
        console.error(err);
        return err;
    });
}

const SuggestedProducts = (props) => {
    return (
            <div>
                <Async promiseFn={loadProductInfo}>
                    {({data, err, isLoading}) => {
                        if (isLoading) return "Loading...";
                            if (err) return `Oops, something went wrong: ${err.message}`
                            if (data && Array.isArray(data)) {
                                return (
                                    data.map((productEntry) => {
                                        return (
                                                <div id="grid-item"> 
                                                    <div id="product-image">&nbsp;</div>
                                                    <div id="name"> {productEntry.name} </div>
                                                    <div id="description"> {productEntry.description} </div>
                                                    <div id="link"> {productEntry.link} </div>
                                                </div>
                                        );
                                })
                            );
                        }
                    }}
                </Async>
        </div>
    );
}

export default SuggestedProducts;