import * as actionTypes from './actionType';
import axios from 'axios';

//**********Processing Purchase**********//
export const initPurchase = () => {
    return {
        type: actionTypes.INIT_PURCHASE
    }
}
export const purchaseMalaStart = () => {
    return {
        type: actionTypes.PURCHASE_MALA_START
    }
}
export const purchaseMalaSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_MALA_SUCCESS,
        orderId: id,
        orderData: orderData
    }
}
export const purchaseMalaFailed = () => {
    return {
        type: actionTypes.PURCHASE_MALA_FAILED
    }
}
export const purchaseMala = (orderData, token) => {
    return dispatch => {
        dispatch(purchaseMalaStart());
        axios.post('https://react-malatang.firebaseio.com/orders.json?auth=' + token, orderData)
        .then(response => {
            dispatch(purchaseMalaSuccess(response.data.name, orderData))
            /* this.setState({ loading : false })
            this.props.history.replace('/') */
        })
        .catch(error => {
            dispatch(purchaseMalaFailed())
        })
    }
}

//**********Fetching List of Orders from Database**********//
export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
}
export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
}
export const fetchOrdersFailed = () => {
    return {
        type: actionTypes.FETCH_ORDERS_FAILED
    }
}
export const fetchOrders = () => {
    return dispatch => {
        dispatch(fetchOrdersStart())
        axios.get('https://react-malatang.firebaseio.com/orders.json')
        .then(res => { // Waiting on promise
            const fetchedOrders = [];
            for (let key in res.data) { // To get data, you have to use .data
                fetchedOrders.push({
                    ...res.data[key], // Using spread operator to make a copy of the fetched Object
                    id: key
                })
            }
            dispatch(fetchOrdersSuccess(fetchedOrders))
            // this.setState({loading:false, orders:fetchedOrders})
        })
            .catch(error => {
                dispatch(fetchOrdersFailed())
            })
    }
}