import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './NavigationItem.css';

const navigationItem = (props) => {
    return (
        <li className={classes.NavigationItem}>
            <NavLink 
                onClick={props.Clicked}
                to={props.link}
                activeClassName={classes.active} // Defining the Active Class Name in this way, as classes will make the 'active' className random
                exact={props.exact} // Enforcing 'exact' this way, so that not every <NavLink> gets stuck with 'exact' if you don't
                >
                {props.children}
            </NavLink>
        </li>
    )
}

export default navigationItem;