import React from 'react';
import classes from './Input.css';

const input = (props) => {
    let inputElement = null;
    const inputClasses = [classes.InputElement];

    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid)
    }

    switch (props.elementType) {
        case ('input'):
            inputElement = <input 
                className={inputClasses.join(' ')} // joins all elements in the inputClasses array with a whitespace
                {...props.elementConfig} // {...props.elementConfig} to cater for any number of props (which may change) This is where things like the placeholder attribute comes through via the state
                value={props.value}
                onChange={props.changed}
            />
            break;
        case ('textarea'):
            inputElement = <textarea 
                className={inputClasses.join(' ')}
                {...props.elementConfig} // {...props.elementConfig} to cater for any number of props (which may change)
                value={props.value}
                onChange={props.changed}
            />
            break;
        case ('select'):
            inputElement = ( 
                <select
                    className={inputClasses.join(' ')}
                    value={props.value}
                    onChange={props.changed}>
                        {props.elementConfig.options.map(option => (
                            <option key={option.value} value={option.value}>{option.displayValue}</option>
                        ))}
                </select>
                )
            break;
        default:
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}
                />;
    }

    let validationError = null;
    if (props.invalid && props.touched) { // Setting an error message for each input field
        validationError = <p>Please enter a valid value for {props.valueType}</p>
    }

    return(
        <div className={classes.Input}>
            <label className={classes.Label}>{props.Label}</label>
            {inputElement}
            {validationError}
        </div>
    )

}

export default input;