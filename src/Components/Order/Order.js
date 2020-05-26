import React from 'react';

const order = (props) => {
    const ingredients = [];
    for (let ingredientName in props.ingredients) { // using For In Loop to cycle through the ingredients Object
        ingredients.push( // Creating an array of objects
            {
                name: ingredientName,
                amount: props.ingredients[ingredientName]
            }
        )
    }
    const ingredientOutput = ingredients.map(ig => { // Using .map to iterate through the Array, to get each Name and Amount Value, which is used in the Return of this component
        return <span key={ig.name} style={{textTransform: 'capitalize', display: 'inline-block', margin: '0 8px', border: '1px solid #ccc', padding: '5px'}}>
            {ig.name} ({ig.amount})
        </span>
    })

    return(
        <div>
            <p>Ingredients: {ingredientOutput}</p>
            <p>Price: ${Number.parseFloat(props.price).toFixed(2)}</p>
        </div>
    )
}

export default order;