import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import logo from '../../images/logo.png';
import './Header.css'

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    return (
        <div className="header">
            <img src={logo} alt=""/>
            <nav className="nav-bar">
                <Link to="Shop">Shop</Link>
                <Link to="Review">Order Review</Link>
                <Link to="Inventory">Manage Inventory</Link>
                <Link to="shipment">Shipment</Link>
                <button onClick={() => setLoggedInUser({})} >Sign Out</button>
            </nav>
        </div>
    );
};

export default Header;