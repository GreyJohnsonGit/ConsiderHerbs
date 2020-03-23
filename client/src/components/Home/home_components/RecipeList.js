import React from 'react';

const RecipeList = () => {
    let Recipes = require('../recipes.json');

    return (
        <div className='recipe-list-container'>
            { Recipes.map((recipe) => {
                return (
                    <div className='recipe-list-item'>
                        <b>{recipe.bodypart} - {recipe.name}</b>
                        <p>{recipe.description}</p>
                    </div>
                )
            })}
        </div>
    )
}

export default RecipeList;