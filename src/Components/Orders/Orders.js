import React, { Component } from 'react';
import Order from '../Order/Order';
import axios from 'axios';

class Orders extends Component {
    state = {
        orders: [],
        loading: true
    }

    componentDidMount() {
        axios.get('https://react-malatang.firebaseio.com/orders.json')
        .then(res => { // Waiting on promise
            const fetchedOrders = [];
            for (let key in res.data) { // To get data, you have to use .data
                fetchedOrders.push({
                    ...res.data[key], // Using spread operator to make a copy of the fetched Object
                    id: key
                })
            }
            this.setState({loading:false, orders:fetchedOrders})
        })
    }
    
    render() {
        return (
            <div>
                {this.state.orders.map(order => ( // Dynamically rendering <Order> component. Using .map to cycle through each value in the array
                    <Order 
                        key = {order.id}
                        ingredients = {order.ingredients}
                        price = {order.price}
                    />
                ))}
                
            </div>
            
        );
    }
}

export default Orders;