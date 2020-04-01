import React from 'react';
import { IoMdStar } from 'react-icons/io';

// remove the .map when priviledges get implemented
const RecipeList = (props) => {
    let Recipes = require('../recipes.json')
        .map((entry,i) => {
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
            return entry;})
        .filter(entry => (
            entry.name.toLowerCase().includes(props.filterText.toLowerCase()) || 
            entry.description.toLowerCase().includes(props.filterText.toLowerCase()) ||
            entry.bodypart.toLowerCase().includes(props.filterText.toLowerCase())));

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
            { Recipes.map((recipe) => {
                return (
                    <div>
                        <div className='recipe-list-item-spacer'></div>
                        <div className='recipe-list-item'>
                            <b onClick={() => props.viewFn(recipe)}>
                                {recipe.bodypart} - {recipe.name}
                            </b>
                            {priviledgeSwitch(recipe.priviledge)}
                            <p>
                                { props.userLevel >= recipe.priviledge ? 
                                recipe.description : 'Subscribe to view this content'}
                            </p>
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