import * as actionTypes from './actionType';
import axios from 'axios';

export const initPurchase = () => {
    return {
        type: actionTypes.INIT_PURCHASE
    }
}

export const purchaseMalaSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_MALA_SUCCESS,
        orderId: id,
        orderData: orderData
    }
}

export const purchaseMalaStart = () => {
    return {
        type: actionTypes.PURCHASE_MALA_START
    }
}

export const purchaseMala = (orderData) => {
    purchaseMalaStart();
    return dispatch => {
        axios.post('https://react-malatang.firebaseio.com/orders.json', orderData)
        .then(response => {
            dispatch(purchaseMalaSuccess(response.data.name, orderData))
            /* this.setState({ loading : false })
            this.props.history.replace('/') */
        })
    }
}