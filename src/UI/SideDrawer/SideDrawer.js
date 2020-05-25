import React from 'react';
import classes from './SideDrawer.css';
import Backdrop from '../Backdrop/Backdrop';
import Logo from '../Logo/Logo';

const sideDrawer = (props) => {
    let attachedClasses = [classes.SideDrawer, classes.Close];
    if (props.open) {
        attachedClasses = [classes.SideDrawer, classes.Open];
    }
    
    return (
        <>
        <Backdrop show={props.open} Clicked={props.close}/>
        <div className={attachedClasses.join(' ')}>
            <div className={classes.Logo}> {/* another method to control the height of the default logo.js, is to wrap it in a new div, and create a class within the CSS to control the height */}
                <Logo />
            </div>
            {/* <nav>
                <NavigationItems />
            </nav> */}
        </div>
        </>
    );
}

export default sideDrawer;