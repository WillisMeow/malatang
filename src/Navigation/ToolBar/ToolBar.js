import React from 'react';
import classes from './ToolBar.css'
import Logo from '../../UI/Logo/Logo';
import DrawerToggle from '../../UI/SideDrawer/DrawerToggle/DrawerToggle';
import NavigationItems from '../NavigationItems/NavigationItems';

const toolBar = (props) => {
    return (
        <header className={classes.ToolBar}>
            <DrawerToggle clicked={props.toggleClicked} />
            <Logo height='150%' />
            <nav className={classes.DesktopOnly}>
                <NavigationItems auth={props.isAuthenticated}/>
            </nav>
            
        </header>
    )
}

export default toolBar;