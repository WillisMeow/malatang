import React from 'react';
import classes from './ToolBar.css'
import Logo from '../../UI/Logo/Logo';

const toolBar = () => {
    return (
        <header className={classes.ToolBar}>
            <div>
                MENU
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