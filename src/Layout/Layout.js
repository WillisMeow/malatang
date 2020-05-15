import React, { Component } from 'react';
import ToolBar from '../Navigation/ToolBar/ToolBar'
import classes from './Layout.css'

class layout extends Component {
    render () {
        return (
            <div>
        <ToolBar/>
        <p>SideDrawer</p>
        <p>Backdrop</p>
        <main className={classes.Content}>
            {this.props.children}
        </main>
    </div>
        )
    }
    
};

export default layout