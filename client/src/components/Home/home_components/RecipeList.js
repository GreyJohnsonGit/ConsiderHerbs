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
            //case 1:
            //    return <IoMdStar size='1.2em' color='#cd7f32' />;   // bronze
            case 1:
                return <IoMdStar size='1.2em' color='#858585' />;   // silver
            case 2:
                return <IoMdStar size='1.2em' color='#d4af37' />;   // gold
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
                                    console.log("Entry",entry)
                                    if (i < 6)
                                    {
                                        entry.priviledge = 0;
                                    }
                                    else if (i < 8)
                                    {
                                        entry.priviledge = 1;
                                    }
                                    else
                                    {
                                        entry.priviledge = 2;
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

                                                { props.userLevel == 3 ? 
                                                    <div>
                                                    <button onClick={() => props.editFn(entry)}>Edit</button>
                                                    <button>Delete</button> 
                                                    </div>
                                                    :
                                                    null
                                                }
                                            
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