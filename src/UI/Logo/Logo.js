import React from 'react';
import MalaLogo from '../../Assets/Images/hot-pot-2.png';
import classes from './Logo.css';

const logo = (props) => (
        <img className={classes.Logo} src={MalaLogo} alt="Logo" style={{height: props.height}}/>
)

export default logo;