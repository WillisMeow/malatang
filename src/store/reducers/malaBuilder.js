import * as actionTypes from '../actions/actionType';

const initialState = {
    ingredients: null,
    error: false,
    totalPrice: 10
}

const ingredientPrices = { // Setting price of each ingredient
    beef: 2,
    pork: 2,
    lamb: 2.5,
    seafood: 3,
    salad: 3,
    noodle: 2,
    tofu: 1.5, 
}


const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.SET_INGREDIENTS:
            return {
                ...state,
                ingredients: action.ingredients,
                error: false,
                totalPrice: 10
            }
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return {
                ...state,
                error: true
            }
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + ingredientPrices[action.ingredientName],
            }
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - ingredientPrices[action.ingredientName]
            }
        default:
            return state

    }
}

export default reducer;