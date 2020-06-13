import React, { Component } from 'react';
import Order from '../Order/Order';
import Spinner from '../../UI/Spinner/Spinner';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/index';


class Orders extends Component {
    componentDidMount() {
        this.props.onFetchOrders()
    }
    
    render() {
        let order = <Spinner />
        if (!this.props.loading) {
            order = this.props.orders.map(order => ( // Dynamically rendering <Order> component. Using .map to cycle through each value in the array
                <Order 
                    key = {order.id}
                    ingredients = {order.ingredients}
                    price = {order.price}
                />
            ))
        }
        return (
            <div>
                {order}
            </div>
            
        );
    }
}

//**********Redux connections**********//
const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: () => dispatch(actionCreators.fetchOrders())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders);