import React from 'react';
import { IoMdStar } from 'react-icons/io';
import Axios from 'axios';
import config from '../../../config.js'
import Async from 'react-async';


// remove the .map when priviledges get implemented
const LoadRecipeList = () => {
    return Axios.get(
        config.address + '/api/Recipe'
    )
    .then(res => {
        return res.data;
    })
    .catch(err => {
        console.error(err);
        return err;
    });
}
const RecipeList = (props) => {

    const priviledgeSwitch = (priviledge) => {
        switch(priviledge) {
            case 1:
                return <IoMdStar size='1.2em' color='#cd7f32' />;
            case 2:
                return <IoMdStar size='1.2em' color='#858585' />;
            case 3:
                return <IoMdStar size='1.2em' color='#d4af37' />;
            default:
               return null;
        }
    }

    return (
        <div className='recipe-list-container'>
            <Async promiseFn={LoadRecipeList}>
                {({data, err, isLoading}) => {
                        if (isLoading) return "Loading...";
                        if (err) return `Oops, something went wrong: ${err.message}`
                        if (data && Array.isArray(data)) {
                            return(
                                data.filter(entry => (
                                    entry.name.toLowerCase().includes(props.filterText.toLowerCase()) || 
                                    entry.description.toLowerCase().includes(props.filterText.toLowerCase()) ||
                                    entry.bodypart.toLowerCase().includes(props.filterText.toLowerCase())))
                                .map((entry,i) => {
                                    //entry.priviledge = 0;
                                    //console.log("Entry",entry)
                                    if (i < 2)
                                    {
                                        entry.priviledge = 0;
                                    }
                                    else if (i < 4)
                                    {
                                        entry.priviledge = 1;
                                    }
                                    else if (i < 6)
                                    {
                                        entry.priviledge = 2;
                                    }
                                    else
                                    {
                                        entry.priviledge = 3;
                                    }
        
                                    return (
                                        <div>
                                            <div className='recipe-list-item-spacer'></div>
                                            <div className='recipe-list-item'>
                                                <b onClick={() => props.viewFn(entry)}>
                                                    {entry.bodypart} - {entry.name}
                                                </b>
                                                {priviledgeSwitch(entry.priviledge)}
                                                <p>
                                                    { props.userLevel >= entry.priviledge ? 
                                                    entry.description : 'Subscribe to view this content'}
                                                </p>
                                                <button onClick={() => {props.editFn(entry)
                                                
                                                console.log(entry.id)
                                                }
                                                }>Edit</button>

                                                <button type='button' className='admin-button' onClick={(event) => {
                                                    console.log("Id sent:", entry._id)
                                                    console.log("Entry:", entry)
                                                    Axios.delete(
                                                        config.address + '/api/Recipe/' + entry.id
                                                    )
                                                    .then((res) => {
                                                    })
                                                    .catch((err) => {
                                                        console.error(err);
                                                    })
                                                }}>
                                                Delete
                                                </button>
                                            </div>
                                        </div>
                                    )
                                })
                            )                        
                        }
                }}
            </Async>
        </div>
    )
}

export default RecipeList;