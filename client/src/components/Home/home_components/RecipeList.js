import React from 'react';

const RecipeList = (props) => {
    let Recipes = require('../recipes.json').filter(entry => (
        entry.name.toLowerCase().includes(props.filterText.toLowerCase()) || 
        entry.description.toLowerCase().includes(props.filterText.toLowerCase()) ||
        entry.bodypart.toLowerCase().includes(props.filterText.toLowerCase())
    ));

    return (
        <div className='recipe-list-container'>
            { Recipes.map((recipe) => {
                return (
                    <div>
                        <div className='recipe-list-item-spacer'></div>
                        <div className='recipe-list-item'>
                            <b>{recipe.bodypart} - {recipe.name}</b>
                            <p>{recipe.description}</p>
                            <button onClick={() => props.editFn(recipe)}>Edit</button>
                            <button>Delete</button>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default RecipeList;