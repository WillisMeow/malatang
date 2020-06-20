import React, { Component } from 'react';
import Input from '../Input/Input';
import classes from './Auth.css';
import Button from '../../UI/Button/Button';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/index';
import Spinner from '../../UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom';

class Auth extends Component {
    state = {
        authForm: {
            id: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ID'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false,
            },
        },
        isSignup: false
    }

    componentDidMount () {
        if (!this.props.buildingMala && this.props.authRedirectPath !== "/") {
            this.props.onSetAuthRedirectPath()
        }
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
        const updatedAuthForm = {...this.state.authForm} // Copying the first layer of the State Object
        const updatedFormElement = {...updatedAuthForm[inputIdentifier]} // Copying the second layer of the State Object
        updatedFormElement.value = event.target.value; // Updating the copied states value with the event.target.value (the user input)
        updatedFormElement.touched = true;
        updatedAuthForm[inputIdentifier] = updatedFormElement
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation) // ie, updatedFormElement.value becomes value in the method
        this.setState({authForm : updatedAuthForm})

        let formIsValid = true;
        for (let inputIdentifier in updatedAuthForm) { // Checking if the whole form has been filled in correctly
            formIsValid = updatedAuthForm[inputIdentifier].valid && formIsValid; // If formIsValid has been made false somewhere, it will always be false
        }
        this.setState({formIsValid : formIsValid})
    }

    submitHandler = (event) => {
        event.preventDefault(); // to prevent default form onsubmit handler behabrious of refreshing page on submitting.
        this.props.onAuth(this.state.authForm.id.value, this.state.authForm.password.value, this.state.isSignup)
    }

    authFormModeSwitchHandler = () => {
        this.setState(prevstate => {
            return {isSignup : !prevstate.isSignup}
        })
    }

    render () {
            const authElementsArray = [];
            for (let key in this.state.authForm) {
                authElementsArray.push({
                    id: key,
                    config: this.state.authForm[key]
                })
            }

            let form = (
                <>
                <form onSubmit={this.submitHandler}>
                    <h2>Enter your details below</h2>
                    {authElementsArray.map(formElement => (
                        <Input
                            key={formElement.id}
                            valueType={formElement.config.elementConfig.placeholder}
                            value={formElement.config.value}
                            elementType={formElement.config.elementType}
                            elementConfig={formElement.config.elementConfig}
                            changed={(event) => this.inputChangedHandler(event, formElement.id)}
                            invalid={!formElement.config.valid}
                            shouldValidate={formElement.config.validation}
                            touched={formElement.config.touched}
                        />
                    ))}
                    <Button btnClass="Positive" disabled={!this.state.formIsValid} >PROCEED</Button>
                </form>
                    <Button btnClass="Positive" clicked={this.authFormModeSwitchHandler}>SWITCH TO {this.state.isSignup ? "SIGNIN" : "SIGNUP"}</Button>
                    </>
            )

            if (this.props.loading) {
                form = <Spinner />
            }

            let authRedirect = null;
            if (this.props.authenticated) {
                authRedirect = <Redirect to={this.props.authRedirectPath} />
            }
        return (
            <div className={classes.auth}>
                {authRedirect}
                {form}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        buildingMala: state.malaBuilder.building,
        authRedirectPath: state.auth.authRedirectPath,
        authenticated: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(actionCreators.auth(email, password, isSignup)),
        onSetAuthRedirectPath: () => dispatch(actionCreators.setAuthRedirectPath("/"))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)