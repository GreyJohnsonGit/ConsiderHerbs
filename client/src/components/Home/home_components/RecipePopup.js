import React, { useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { FaPlusSquare } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';
import axios from 'axios';
import config from '../../../config.js'

// props.entry => entry being edited
// props.mode => 'view', 'edit' or 'new'

const RecipePopUp = (props) => {
    console.log("Props sent in:", props.h)
    const [description,setDescription ] = useState(props.entry.description,);
    const [ingredients,setIngredients ] = useState(props.entry.ingredients);
    const [ailment,setAilment ] = useState(props.entry.ailment);
    const [bodypart,setBodyPart ] = useState(props.entry.bodypart);
    const [name,setName ] = useState(props.entry.name);
    const [numIngredient,setNumIngredients ] = useState(props.entry.ingredients.length);

    const submitForm = (event) => {
        // if(props.mode === 'edit') {
        //     axios.put(
        //         config.address + '/api/Recipe/' + props.entry.title,
        //         {
        //             title: title,
        //             definition: definition,
        //             usage: usage
        //         }
        //     )
        //     .then((res) => {
        //         console.log(res);
        //         props.closeFn();
        //     })
        //     .catch((err) => {
        //         console.error(err);
        //         props.closeFn();
        //     })
        // }
        if(props.mode === 'new') {
            axios.post(
                config.address + '/api/Recipe/',
                {
                    description : description,
                    ingredients: ingredients,
                    ailment : ailment,
                    bodypart  : bodypart,
                    name : name
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
        <div className='recipe-popup'>
            <div className='recipe-popup-inner'>
                <MdClose className='recipe-popup-close-icon' size='2em' onClick={props.closeFn} />
                { props.mode === 'view' ?
                    <div>
                        <div className='recipe-popup-title'>
                            {props.entry.name}
                        </div>
                        { props.userLevel >= props.entry.priviledge ?
                            <div> 
                                <div className='recipe-popup-description'>
                                    {props.entry.description}
                                </div>
                                <ul>
                                    { props.entry.ingredients.map((ingredient) => {
                                        return (
                                            <li>{ingredient.ingredient} - {ingredient.amount} {ingredient.unit}</li>
                                        )
                                    })}
                                </ul>
                            </div> : <div className='recipe-popup-description'>Subscribe to view this content</div> }
                    </div>
                :
                <form onSubmit={submitForm}>
                        <div className='recipe-popup-edit-top-row'>
                            <label for='name'>Name</label>
                            <label for='bodypart'>Body Part</label>
                            <label for='ailment'>Ailment</label>
                            <input type='text' id='name' defaultValue={props.entry.name} onChange={(event)=>{setName(event.target.value)}}/>
                            <input type='text' id='bodypart' defaultValue={props.entry.bodypart} onChange={(event)=>{setBodyPart(event.target.value)}}/>
                            <input type='text' id='ailment' defaultValue={props.entry.ailment} onChange={(event)=>{setAilment(event.target.value)}}/>
                        </div>
                        <div className='recipe-popup-edit-ingredients'>
                            <span>Ingredient</span>
                            <span>Amount</span>
                            <span>Unit</span>
                            <span></span>
                        </div>
                        {ingredients.map((ingredient,i) => {
                            return (
                                <div className='recipe-popup-edit-ingredients'>
                                    <input type='text' defaultValue={ingredient.ingredient} onChange = {(event)=>{ingredient.ingredient =  event.target.value}}/>
                                    <input type='text' defaultValue={ingredient.amount} onChange = {(event)=>{ingredient.amount =  event.target.value}}/>
                                    <input type='text' defaultValue={ingredient.unit} onChange = {(event)=>{ingredient.unit =  event.target.value}}/>
                                    <FaTrashAlt
                                        size='1.7em'
                                        color='red'
                                        onClick={() => {
                                            ingredients.splice(i,1);
                                            setNumIngredients(ingredients.length);
                                        }}
                                    />
                                </div>
                            )
                        })}
                        <FaPlusSquare
                            size='1.7em'
                            color='green'
                            onClick={() => {
                                ingredients.push({amount:"", unit:"", ingredient:""})
                                setNumIngredients(ingredients.length);
                                console.log("ingredients:",ingredients)
                            }}
                        />
                        <label for='description'>Description</label>
                        <textarea rows='3' id='description' value={props.entry.description}/>
                        { props.mode === 'edit' ? 
                            <button type='submit'>Submit</button> 
                        :
                            <button type='submit'>Submit</button>
                        }
                    </form>
                }
            </div>
        </div>
    )
}

export default RecipePopUp;