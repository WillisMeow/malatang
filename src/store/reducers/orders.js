import * as actionTypes from '../actions/actionType';

const initialState = {
    orders: [],
    loading: false,
    purchased: false,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.INIT_PURCHASE:
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
        default:
            return state
    }
}

export default reducer;