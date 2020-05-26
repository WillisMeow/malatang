import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.css';

const navigationItems = (props) => {
    return(
        <ul className={classes.NavigationItems}>
        <NavigationItem Clicked={props.LinkClicked} exact link='/' >MENU</NavigationItem> {/* LinkClicked is linked to SideDawer closing */}
        <NavigationItem Clicked={props.LinkClicked} link='/orders' >ORDERS</NavigationItem>
        </ul>
    )
}

export default navigationItems;