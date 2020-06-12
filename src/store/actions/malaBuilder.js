import * as actionType from './actionType';
import axios from 'axios';

export const setIngredients = (ingredients) => { //sync action creator for below initIngredient async creator
    return {
        type: actionType.SET_INGREDIENTS,
        ingredients: ingredients
    }
}
export const fetchIngredientsFailed = () => { //sync action creator for below initIngredient async creator
    return {
        type: actionType.FETCH_INGREDIENTS_FAILED
    }
}
export const initIngredients = () => { // async action creator
    return dispatch => {
        axios.get("https://react-malatang.firebaseio.com/ingredients.json")
        .then(response => {
            dispatch(setIngredients(response.data))
        })
        .catch(error => {
            dispatch(fetchIngredientsFailed())
        })
    }
}

export const addIngredient = (ingName) => {
    return{
        type: actionType.ADD_INGREDIENT,
        ingredientName: ingName
    }
}

export const removeIngredient = (ingName) => {
    return{
        type: actionType.REMOVE_INGREDIENT,
        ingredientName: ingName
    }
}