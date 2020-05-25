import React, { Component } from 'react';
import ToolBar from '../Navigation/ToolBar/ToolBar'
import classes from './Layout.css'
import SideDrawer from '../UI/SideDrawer/SideDrawer';

class layout extends Component {
    state = {
        showSideDrawer: true
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
        <ToolBar toggleClicked={this.toggleClickHandler} />
        <SideDrawer open={this.state.showSideDrawer} close={this.closeSideDrawerHandler}/>
        <main className={classes.Content}>
            {this.props.children}
        </main>
    </div>
        )
    }
    
};

export default layout