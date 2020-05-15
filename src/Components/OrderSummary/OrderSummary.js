import React, { Component } from 'react';
import Button from '../../UI/Button/Button';

class orderSummary extends Component {
    render () {
        const List = Object.keys(this.props.ingredients)
        .map(igKey => {
            return (this.props.ingredients[igKey] ? <li style={{textTransform: 'capitalize'}} key={igKey}>{igKey}: {this.props.ingredients[igKey]}</li> : null)
        })

        return (
            <div>
            <h2>Your Order</h2>
                <p>Malatang with the following ingredients:</p>
                <ul>
                    {List}
                </ul>
                <p>Total price: <strong>${this.props.price.toFixed(2)}</strong></p>
                <p>Continue to check out?</p>
                <Button btnClass={'Positive'} clicked={this.props.processOrder}>CONTINUE</Button>
                <Button btnClass={'Negative'} clicked={this.props.cancelOrder}>CANCEL</Button>
            </div>
        )
    }

    
}

export default orderSummary;