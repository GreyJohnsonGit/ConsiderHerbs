import Async from 'react-async';
import Axios from 'axios';
import React, {useState} from 'react';
import config from '../../../config.js';
import DidYouKnowContent from './DidYouKnowContent.js';
import DidYouKnowComments from './DidYouKnowComments.js';
import { Route, Switch, Link } from 'react-router-dom';
import DidYouKnowImage from './assets/Did_You_Know_IMG.jpg';


const loadPostInfo = () => {
    return Axios.get(
        config.address + '/api/DidYouKnow/'
    )
    .then(res => {
        return res.data;
    })
    .catch(err => {
        console.error(err);
        return err;
    });
}


const PostInfo = (props) => {

    return(
        <div>
            
            <Async promiseFn={loadPostInfo}>
                {({data, err, isLoading}) => {
                    if (isLoading) return "Loading...";
                    if (err) return `Oops, something went wrong: ${err.message}`
                    if (data && Array.isArray(data)) {
                        return (
                            data.map((didYouKnowEntry) => {

                                const DidYouKnowContentPage = (props) => {
                                    return (
                                      <DidYouKnowContent 
                                        didYouKnowEntry={didYouKnowEntry}
                                      />
                                    );
                                }


                                return(
                                    <div>                                            
                                            <div className="did-you-know-post">
                                                <div id='bar'>&nbsp;</div>
                                                <div>
                                                    <form>
                                                        <button type='button' className='admin-button' onClick={() => props.editFn(didYouKnowEntry)}>Edit</button>
                                                        <button type='submit' className='admin-button' onClick={(event) => {
                                                            Axios.delete(
                                                                config.address + '/api/DidYouKnow/' + didYouKnowEntry.title
                                                            )
                                                            .then((res) => {
                                                                window.location.reload();
                                                            })
                                                            .catch((err) => {
                                                                console.error(err);
                                                            })
                                                        }}>
                                                        Delete
                                                        </button>
                                                    </form>

                                                    <h2>{didYouKnowEntry.title}</h2>
                                                    <h3>posted by Dee on {didYouKnowEntry.date}</h3>

                                                    <div id="image">
                                                        <img src={didYouKnowEntry.image} style={{width:"100%"}} />
                                                    </div>

                                                    
                                                    <DidYouKnowContentPage />
                                                    
                                                    
                                                </div>
                                            </div>
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

export default PostInfo;
