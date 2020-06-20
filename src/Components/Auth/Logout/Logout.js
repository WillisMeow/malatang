import React, { Component } from 'react';
import * as actionCreators from '../../../store/actions/index';
import { connect } from 'react-redux';
import { redirect, Redirect } from 'react-router-dom';

class Logout extends Component {
    componentDidMount () {
        this.props.onLogout();
    }
    
    render () {
        
        return (
            <Redirect to="/" />
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(actionCreators.logout())
    }
}

export default connect(null, mapDispatchToProps)(Logout);