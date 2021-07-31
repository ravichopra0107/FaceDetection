import React from 'react';
import classes from "./Footer.module.css";

const Footer = (props) => {
    return(
        <div className={classes.Footer}>
            <i className="fab fa-linkedin-in"></i>
            <i className="fab fa-github"></i>
        </div>
    );
}

export default Footer;