import React from 'react';
import classes from './BuildControl.css'

const buildControl = (props) => {
    return (
        <div className={classes.BuildControl}>
            <div className={classes.Label}>{props.type} Qty: {props.qty}</div>
            <button 
                className={classes.More} 
                onClick={props.added}>
                Add
            </button>
            <button 
                disabled={props.disabled} 
                className={classes.Less} 
                onClick={props.removed}>
                Remove
            </button>
        </div>
    )
};

export default buildControl;