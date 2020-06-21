import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.css';

const navigationItems = (props) => {
    return(
        <ul className={classes.NavigationItems}>
        <NavigationItem Clicked={props.LinkClicked} exact link='/' >MENU</NavigationItem> {/* LinkClicked is linked to SideDawer closing */}
        <NavigationItem Clicked={props.LinkClicked} link='/orders' >ORDERS</NavigationItem>
        {props.auth ? null :<NavigationItem Clicked={props.LinkClicked} link='/auth' >AUTHENTICATION</NavigationItem>}
        {props.auth ? <NavigationItem Clicked={props.LinkClicked} link='/logout' >LOGOUT</NavigationItem> : null}
        </ul>
    )
}

export default navigationItems;