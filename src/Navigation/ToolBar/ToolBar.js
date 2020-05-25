import React from 'react';
import classes from './ToolBar.css'
import Logo from '../../UI/Logo/Logo';
import DrawerToggle from '../../UI/SideDrawer/DrawerToggle/DrawerToggle';

const toolBar = (props) => {
    return (
        <header className={classes.ToolBar}>
        <DrawerToggle clicked={props.toggleClicked} />
            <div onclick={props.menuClicked}>
            MENU
                {/* <button onClick={props.clickedMenu}>MENU</button> */}
            </div>
            <Logo height='150%' />
            <div>
                MalaTang Builder
            </div>
            <div>
                Checkout
            </div>
        </header>
    )
}

export default toolBar;