import React, { Component } from 'react';
import Mala from '../Mala/Mala';
import Modal from '../../UI/Modal/Modal';
import OrderSummary from '../OrderSummary/OrderSummary';
import Spinner from '../../UI/Spinner/Spinner';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/index';

class MalaBuilder extends Component {
    state = {
        removable: false,
        purchasable: false,
        purchasing: false
    }

    // Use this handler to update the state, and in the Component Atrributes, pass through the state, not this method
    componentDidMount () {
        this.props.onInitIngredients()
    }

    purchasableHandler = (ingredients) => {
        let sum = Object.keys(ingredients)
        .map(igKey => {
            return ingredients[igKey]
        })
        .reduce((sum, el) => {
            return sum + el
        }, 0)
        return sum > 0;
    }

    purchasingStateHandler = () => {
        if (this.props.authenticated) {
            this.setState({purchasing : true})
        } else {
            this.props.history.push("/auth")
            this.props.onSetAuthRedirectPath("/contactDetails")
        }
    }
    cancelOrderHandler = () => {
        this.setState({purchasing : false})
    }

    processOrderHandler = () => {
        this.props.onInitPurchase() // used to reset purchased state (global redux within orders.js) to false
        this.props.history.push({
            pathname: '/contactDetails'
        })
    }

    render () {
        const disabledInfo = { // To create an array with information as to whether the remove button should be disabled for each ingredient
            ...this.props.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0 // Returns {beef: true, lamb: false...}
        };

        let summary = null;
        if (this.props.ingredients) {
            summary = <OrderSummary 
                        ingredients={this.props.ingredients} 
                        price={this.props.totalPrice} 
                        processOrder={this.processOrderHandler} 
                        cancelOrder={this.cancelOrderHandler}
                        />
        }

        let mala = (this.props.error ? <p>Ingredients can't be loaded!</p> : <Spinner />)
        if (this.props.ingredients) { // making sure the <Mala> componenet is not loaded before the ingredients global redux state is set.
            mala = (
                <Mala 
                    addClicker={this.props.onAddIngredient} 
                    removeClicker={this.props.onRemoveIngredient} 
                    ingredients={this.props.ingredients}
                    totalPrice={this.props.totalPrice}
                    disabled={disabledInfo}
                    purchasable={this.purchasableHandler(this.props.ingredients)}
                    clicked={this.purchasingStateHandler}
                    isAuthenticated={this.props.authenticated}
                />
                    )
        }
        return (
            <>
            <Modal cancelClicked={this.cancelOrderHandler} show={this.state.purchasing}>
                {summary}
            </Modal>
            {mala}
            </>
        )
    }
};

const mapStateToProps = state => {
    return {
        ingredients: state.malaBuilder.ingredients,
        error: state.malaBuilder.error,
        totalPrice: state.malaBuilder.totalPrice,
        authenticated: state.auth.token !== null
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onInitIngredients: () => dispatch(actionCreators.initIngredients()),
        onAddIngredient: (type) => dispatch(actionCreators.addIngredient(type)),
        onRemoveIngredient: (type) => dispatch(actionCreators.removeIngredient(type)),
        onInitPurchase: () => dispatch(actionCreators.initPurchase()),
        onSetAuthRedirectPath: (path) => dispatch(actionCreators.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MalaBuilder);