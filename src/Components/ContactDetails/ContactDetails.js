import React, { Component } from 'react';
import Spinner from '../../UI/Spinner/Spinner';
import Button from '../../UI/Button/Button';
import classes from './ContactDetails.css';
import axios from 'axios';
import Input from '../Input/Input';
import * as actionCreators from '../../store/actions/index';
import { connect } from 'react-redux';
import {Route, Redirect} from 'react-router-dom';

class contactDetails extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Street Address'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your ZipCode'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false,
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email Address'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest'},
                        { value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: 'fastest',
                validation: {},
                valid: false,
            }

        },
        loading: false,
        formIsValid: false,
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
        event.preventDefault(); // Stop in automatically sending a request, which will reload the page
        this.setState({ loading : true }); // Setting loading to true, so that the user can see the spinner
        const formData = {}; // Creating an object with the key value pair from the state object (i.e name: willis etc..)
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value // Creating key value pairs in the formData object
        }

        const order = { // Data that is sent to the server
            price: this.props.totalPrice,
            ingredients: this.props.ingredients,
            orderData: formData // Key Value pair object we created above
        }
        this.props.onPurchaseMala(order);
        /* axios.post('https://react-malatang.firebaseio.com/orders.json', order)
        .then(response => {
            this.setState({ loading : false })
            this.props.history.replace('/')
        }) */
    }

    checkValidity(value, rules) {
        let isValid = true; // Starting off with True allows multiple if checks to be done, and one false will trigger a false

        if (rules.required) { // if there is a "required" for this element
            isValid = value.trim() !== '' && isValid; //.trim removes any whitespace before and after the input
        }
        if (rules.minLength) { // if there is a "minLength" for this element
            isValid = value.length >= rules.minLength && isValid // isValid part makes it so that this check will only be true, if the variable isValid is already true. i.e, if the variable has already been triggered to false by another check, all others will be rendered false as well.
        }
        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }
        return isValid;
    }

    inputChangedHandler = (event, inputIdentifier) => {
        console.log(event.target.value)
        const updatedOrderForm = {...this.state.orderForm} // Copying the first layer of the State Object
        const updatedFormElement = {...updatedOrderForm[inputIdentifier]} // Copying the second layer of the State Object
        updatedFormElement.value = event.target.value; // Updating the copied states value with the event.target.value (the user input)
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation) // ie, updatedFormElement.value becomes value in the method
        this.setState({orderForm : updatedOrderForm})

        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) { // Checking if the whole form has been filled in correctly
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid; // If formIsValid has been made false somewhere, it will always be false
        }
        this.setState({formIsValid : formIsValid})
    }
    
    render() {
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }

        let form = (
            <form onSubmit={this.orderHandler} >
                <h3>Enter your Contact Details</h3>
                {formElementsArray.map(formElement => (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        valueType={formElement.config.elementConfig.placeholder}
                    />
                ))}
                <Button btnClass="Positive" disabled={!this.state.formIsValid} >ORDER</Button>
            </form>
        );
            if (this.props.loading) {
                form = 
                <>
                    <h2 className={classes.ContactDetails}>Processing</h2>   
                    <Spinner/>
                </>
            };

            if (this.props.purchased) { // this.props.purchased used to return back to the main page.
                form = <Redirect to="/" />
            }

        return (
            <div className={classes.ContactDetails}>
                {form}
                {/* {summary} */}
            </div>

        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.order.loading,
        totalPrice: state.malaBuilder.totalPrice,
        ingredients: state.malaBuilder.ingredients,
        purchased: state.order.purchased
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onPurchaseMala: (data) => dispatch(actionCreators.purchaseMala(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(contactDetails);