import * as actionTypes from '../actions/actionType';

const initialState = {
    orders: [],
    loading: false,
    purchased: false,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        //*********Processing Order Purchase**********//
        case actionTypes.INIT_PURCHASE: // Purpose is to reset purchased state to false.
            return {
                ...state,
                purchased:false
            }
        case actionTypes.PURCHASE_MALA_START:
            return {
                ...state,
                loading: true
            }
        case actionTypes.PURCHASE_MALA_SUCCESS:
            const newOrder = {
                ...action.orderData,
                id: action.orderId
            }
            return {
                ...state,
                orders: state.orders.concat(newOrder),
                loading: false,
                purchased: true
            }
        case actionTypes.PURCHASE_MALA_FAILED:
            return {
                ...state,
                loading: false
            }
        //*********Fetching Orders**********//
        case actionTypes.FETCH_ORDERS_START:
            return {
                ...state,
                loading: true
            }
        case actionTypes.FETCH_ORDERS_SUCCESS:
            return {
                ...state,
                orders: action.orders,
                loading: false
            }
        case actionTypes.FETCH_ORDERS_FAILED:
            return {
                ...state,
                loading: false
            }
        default:
            return state
    }
}

export default reducer;