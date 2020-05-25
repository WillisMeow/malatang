import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.css';

const navigationItems = () => {
    return(
        <ul className={classes.NavigationItems}>
        <NavigationItem link='/' >MENU</NavigationItem>
        <NavigationItem link='/orders' >ORDERS</NavigationItem>
        </ul>
    )
}

export default navigationItems;