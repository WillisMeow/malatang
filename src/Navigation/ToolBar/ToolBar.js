import React from 'react';
import classes from './ToolBar.css'
import Logo from '../../UI/Logo/Logo';
import DrawerToggle from '../../UI/SideDrawer/DrawerToggle/DrawerToggle';
import NavigationItems from '../NavigationItems/NavigationItems';

const toolBar = (props) => {
    return (
        <header className={classes.ToolBar}>
        <DrawerToggle clicked={props.toggleClicked} />
        <NavigationItems />
            {/* <div onclick={props.menuClicked}>
            MENU
            </div> */}
            <Logo height='150%' />
            {/* <div>
                MalaTang Builder
            </div>
            <div>
                Checkout
            </div> */}
        </header>
    )
}

export default toolBar;