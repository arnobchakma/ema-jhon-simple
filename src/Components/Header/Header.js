import React from 'react';
import logo from '../../images/logo.png';
import './Header.css'

const Header = () => {
    return (
        <div className="header">
            <img src={logo} alt=""/>
            <nav className="nav-bar">
                <a href="Service">Customer Service</a>
                <a href="Gift">Gift Cards</a>
                <a href="Sell">Sell</a>
                <a href="About">About</a>
                <a href="Registry">Registry</a>
            </nav>
        </div>
    );
};

export default Header;