import React, { Component } from 'react';
import classes from './MalaIngredient.css';

class MalaIngredient extends Component {
    render () {
            let ingredient = null;

            switch (this.props.type) {
                case ('beef'):
                    ingredient = <div className={classes.Beef}>Beef Qty:{this.props.qty}</div> ;
                    break;
                case ('pork'):
                    ingredient = <div className={classes.Pork}>Pork Qty:{this.props.qty}</div> ;
                    break;
                case ('lamb'):
                    ingredient = <div className={classes.Lamb}>Lamb Qty:{this.props.qty}</div> ;
                    break;
                case ('seafood'):
                    ingredient = <div className={classes.Seafood}>Seafood Qty:{this.props.qty}</div> ;
                    break;
                case ('salad'):
                    ingredient = <div className={classes.Salad}>Salad Qty:{this.props.qty}</div> ;
                    break;
                case ('noodle'):
                    ingredient = <div className={classes.Noodle}>Noodle Qty:{this.props.qty}</div> ;
                    break;
                case ('tofu'):
                    ingredient = <div className={classes.Tofu}>Tofu Qty:{this.props.qty}</div> ;
                    break;
                default: 
                    ingredient = null;
            }
        return ( 
                ingredient
        );
    }
};

export default MalaIngredient;