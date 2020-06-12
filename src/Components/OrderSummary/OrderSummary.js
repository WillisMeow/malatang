import React, { Component } from 'react';
import Button from '../../UI/Button/Button';
import {Route, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/index';

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

const mapStateToProps = state => {
    return {
        ings: state.malaBuilder.ingredients,
        purchased: state.order.purchased
    }
}

export default connect(mapStateToProps)(orderSummary);