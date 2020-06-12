import React, { Component } from 'react';
import Mala from '../Mala/Mala';
import Modal from '../../UI/Modal/Modal';
import OrderSummary from '../OrderSummary/OrderSummary';
import Spinner from '../../UI/Spinner/Spinner';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/index';

class MalaBuilder extends Component {
    state = {
        /* ingredients: {
            beef: 0,
            pork: 0,
            lamb: 0,
            seafood: 0,
            salad: 0,
            noodle: 0,
            tofu: 0,
        }, */
        totalPrice: 10,
        price: {
            beef: 2,
            pork: 2,
            lamb: 2.5,
            seafood: 3,
            salad: 3,
            noodle: 2,
            tofu: 1.5, 
        },
        removable: false,
        purchasable: false,
        purchasing: false,
        sendingData: false,
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

    // Adding ingredients in State
    ingredientAddedHandler = (type) => {
        let oldIngredient = this.state.ingredients[type]
        let newIngredient = oldIngredient + 1;
        let ingredientState = {...this.state.ingredients}
        ingredientState[type] = newIngredient
        this.setState({ingredients : ingredientState})
        // Increasing totalPrice
        let ingredientPrice = this.state.price[type]
        let newTotal = this.state.totalPrice + ingredientPrice
        this.setState({totalPrice : newTotal})

        this.purchasableHandler(this.props.ingredients) // Passing through ingredientState to ensure working with most up to date state
    };
    // Removing ingredients in State
    ingredientRemovedHandler = (type) => {
        let oldIngredient = this.state.ingredients[type]
        if (oldIngredient > 0) {
            let newIngredient = oldIngredient - 1;
        let ingredientState = {...this.state.ingredients}
        console.log(oldIngredient)
        console.log(newIngredient)
        ingredientState[type] = newIngredient
        this.setState({ingredients : ingredientState})
        // Decreasing totalPrice
        let ingredientPrice = this.state.price[type]
        let newTotal = this.state.totalPrice - ingredientPrice
        this.setState({totalPrice : newTotal})
        this.purchasableHandler(ingredientState)
        } else { //If Qty = 0, return null.
            return null;
        }
        
    }

    purchasingStateHandler = () => {
        this.setState({purchasing : true})
    }
    cancelOrderHandler = () => {
        this.setState({purchasing : false})
    }

    processOrderHandler = () => {
        const queryParams = []; // Creating the Query params, to enable data to be passed to ContactDetails page
        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        console.log(queryParams)
        queryParams.push('price=' + this.state.totalPrice)
        const queryString = queryParams.join('&');
        console.log(queryString)
        this.props.history.push({
            pathname: '/contactDetails',
            search: '?' + queryString
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
        if (this.state.ingredients) {
            summary = <OrderSummary ingredients={this.state.ingredients} price={this.state.totalPrice} processOrder={this.processOrderHandler} cancelOrder={this.cancelOrderHandler}/>
        }
        if (this.state.sendingData) {
            summary = <Spinner />
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
                />
                    )
        }
        return (
            <>
            <Modal cancelClicked={this.cancelOrderHandler} show={this.state.purchasing}>
                {/* <Button text={'Hello'} clicked={this.cancelOrderHandler}/> */} {/* TODO: Create a orderProcessHandler that resets ingredient states to 0 and sends http request, sending data to firebase */}
                {summary}
            </Modal>
            {mala}
            </>
        )
    }
};

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        error: state.error,
        totalPrice: state.totalPrice,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onInitIngredients: () => dispatch(actionCreators.initIngredients()),
        onAddIngredient: (type) => dispatch(actionCreators.addIngredient(type)),
        onRemoveIngredient: (type) => dispatch(actionCreators.removeIngredient(type))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MalaBuilder);