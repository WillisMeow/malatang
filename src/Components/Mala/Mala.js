import React from 'react';
//import MalaIngredient from '../MalaIngredient/MalaIngredient';
import BuildControl from '../BuildControl/BuildControl';
import classes from './Mala.css';

const controls = [
    { label: 'Beef', type: 'beef'},
    { label: 'Lamb', type: 'lamb'},
    { label: 'Pork', type: 'pork'},
    { label: 'Seafood', type: 'seafood'},
    { label: 'Noodle', type: 'noodle'},
    { label: 'Tofu', type: 'tofu'},
    { label: 'Salad', type: 'salad'},
]

const mala = (props) => {
    /* let ingredientKey = Object.keys(props.ingredients)
    .map((igKey, i) => {
        return (
            <>
            <BuildControl type={igKey} qty={props.ingredients[igKey]} addClicked={() => props.addClicker(igKey.type)}/>
            </>
        )
    });
    console.log(ingredientKey) */


    return (
        <div className={classes.Mala}>
            <p><strong>Total Price: ${props.totalPrice.toFixed(2)}</strong></p>
            {controls.map(ctrl => {
            return (
            <BuildControl className={classes.BuildControl}
                key={ctrl.label}
                type={ctrl.label}
                qty={props.ingredients[ctrl.type]}
                added={() => props.addClicker(ctrl.type)}
                removed={() => props.removeClicker(ctrl.type)}
                disabled={props.disabled[ctrl.type]}
            />
        )
        })}
        <button onClick={props.clicked} className={classes.Button} disabled={!props.purchasable}>ORDER NOW</button>
        </div>
    )
};

export default mala;