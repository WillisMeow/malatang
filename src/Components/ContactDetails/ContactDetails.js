import React, { Component } from 'react';
import Spinner from '../../UI/Spinner/Spinner';
import Button from '../../UI/Button/Button';
import classes from './ContactDetails.css';
import axios from 'axios';

class contactDetails extends Component {
    state = {
        loading: false,
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        ingredients: null,
        totalPrice: 0,

    }

    componentWillMount () {
        // Below is used to set the States to the correct ingredients and totalPrice, using the Query Params that were passed from MalaBuilder, ProcessOrderHandler method
        const query = new URLSearchParams(this.props.location.search); // extracting the 'search' prop, and creating an object (new creates a new object)
        const ingredients = {};
        let price = 0;
        for (let param of query.entries()) { //.entries returns an iterator, from which you can loop through all key/value pairs contained within the object 
            if (param[0] === 'price') {
                price = param[1]
            } else { // eg [salad, 1]
                ingredients[param[0]] = +param[1]
            }
        }
        this.setState({ ingredients:ingredients, totalPrice:price})
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({ loading : true });
        
        const order = {
            price: this.state.totalPrice,
            ingredients: this.state.ingredients,
            customer: {
                name: "Willis Park",
                address: {
                    street: "101 Test Street",
                    zipcode: "42001",
                    country: "New Zealand"
                },
                email: "test@gmail.com"
            },
            deliveryMethod: 'Next Day'
        }
        axios.post('https://react-malatang.firebaseio.com/orders.json', order)
        .then(response => {
            this.setState({ loading : false })
            this.props.history.replace('/')
            /* let oldState = {...this.state.ingredients}
            for(const igKey in oldState) {
            oldState[igKey] = 0 */
            }
        /* this.setState({sendingData : false, purchasing : false, ingredients : oldState, totalPrice : 10}) */
        )
    }
    
    render() {
        let form = (
            <form className={classes.ContactDetails}>
                <h3>Please enter your Contact Details below</h3>
                <input className={classes.Input} type="text" name="name" placeholder="Your Name"/>
                <input className={classes.Input} type="email" name="email" placeholder="Your Email"/>
                <input className={classes.Input} type="text" name="street" placeholder="Your Street Address"/>
                <input className={classes.Input} type="text" name="postal" placeholder="Your Postal Code"/>
                <Button className={classes.Positive} clicked={this.orderHandler}>ORDER</Button>
            </form>
        );
            if (this.state.loading) {
                form = 
                <>
                 <h2 className={classes.ContactDetails}>Hello</h2>   
                <Spinner/>
                </>
            }
        return (
            <div>
                {form}
            </div>

        )
    }
}

export default contactDetails;