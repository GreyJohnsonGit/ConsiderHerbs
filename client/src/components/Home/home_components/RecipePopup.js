import React, { useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { FaPlusSquare } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';

// props.entry => entry being edited
// props.mode => 'view', 'edit' or 'new'

const RecipePopUp = (props) => {
    const [/*numIngredient*/,setNumIngredients ] = useState(0);

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
                    <form action='/Recipe'>
                        <div className='recipe-popup-edit-top-row'>
                            <label for='name'>Name</label>
                            <label for='bodypart'>Body Part</label>
                            <label for='ailment'>Ailment</label>
                            <input type='text' id='name' value={props.entry.name} />
                            <input type='text' id='bodypart' value={props.entry.bodypart} />
                            <input type='text' id='ailment' value={props.entry.ailment} />
                        </div>
                        <div className='recipe-popup-edit-ingredients'>
                            <span>Ingredient</span>
                            <span>Amount</span>
                            <span>Unit</span>
                            <span></span>
                        </div>
                        { props.entry.ingredients.map((ingredient,i) => {
                            return (
                                <div className='recipe-popup-edit-ingredients'>
                                    <input type='text' value={ingredient.ingredient} />
                                    <input type='text' value={ingredient.amount} />
                                    <input type='text' value={ingredient.unit} />
                                    <FaTrashAlt
                                        size='1.7em'
                                        color='red'
                                        onClick={() => {
                                            props.entry.ingredients.splice(i,1);
                                            setNumIngredients(props.entry.ingredients.length);
                                        }}
                                    />
                                </div>
                            )
                        })}
                        <FaPlusSquare
                            size='1.7em'
                            color='green'
                            onClick={() => {
                                props.entry.ingredients.push([]);
                                setNumIngredients(props.entry.ingredients.length);
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