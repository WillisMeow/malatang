import React, { Component } from 'react';
import Mala from '../Mala/Mala';
import Modal from '../../UI/Modal/Modal';
import OrderSummary from '../OrderSummary/OrderSummary';
import Spinner from '../../UI/Spinner/Spinner';

class MalaBuilder extends Component {
    state = {
        ingredients: {
            beef: 0,
            pork: 0,
            lamb: 0,
            seafood: 0,
            salad: 0,
            noodle: 0,
            tofu: 0,
        },
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
    purchasableHandler = (ingredients) => {
        let sum = Object.keys(ingredients)
        .map(igKey => {
            return ingredients[igKey]
        })
        .reduce((sum, el) => {
            return sum + el
        })
        if (sum > 0) {
            this.setState({ purchasable : true })
        } else {
            this.setState({ purchasable : false })
        }
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

        this.purchasableHandler(ingredientState) // Pasing through inredientState to ensure working with most up to date state
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
        // To create an array with information as to whether the remove button should be disabled for each ingredient
        const disabledInfo = {
            ...this.state.ingredients
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
        return (
            <>
            <Modal cancelClicked={this.cancelOrderHandler} show={this.state.purchasing}>
                {/* <Button text={'Hello'} clicked={this.cancelOrderHandler}/> */} {/* TODO: Create a orderProcessHandler that resets ingredient states to 0 and sends http request, sending data to firebase */}
                {summary}
            </Modal>
            <Mala 
                addClicker={this.ingredientAddedHandler} 
                removeClicker={this.ingredientRemovedHandler} 
                ingredients={this.state.ingredients}
                totalPrice={this.state.totalPrice}
                disabled={disabledInfo}
                purchasable={this.state.purchasable}
                clicked={this.purchasingStateHandler}
                />
            </>
        )
    }
};

export default MalaBuilder