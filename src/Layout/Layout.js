import React, { Component } from 'react';
import ToolBar from '../Navigation/ToolBar/ToolBar'
import classes from './Layout.css'
import SideDrawer from '../UI/SideDrawer/SideDrawer';
import { connect } from 'react-redux';

class layout extends Component {
    state = {
        showSideDrawer: false
    }

    closeSideDrawerHandler = () => {
        this.setState({showSideDrawer : false})
    }

    toggleClickHandler = () => {
        this.setState((prevState) => {
            return({showSideDrawer : !prevState.showSideDrawer})
        })
    }

    render () {
        return (
            <div>
        <ToolBar toggleClicked={this.toggleClickHandler} isAuthenticated={this.props.isAuthenticated}/>
        <SideDrawer open={this.state.showSideDrawer} close={this.closeSideDrawerHandler}/>
        <main className={classes.Content}>
            {this.props.children}
        </main>
    </div>
        )
    }
    
};

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(layout)