import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import './Product.css';
import { Link } from 'react-router-dom';

const Product = (props) => {
    // console.log(props.product)
    const {
        name, 
        img, 
        seller, 
        stock, 
        price, 
        shipping,
        key
    }= props.product;
    return (
        <div className="single-product">
            <div className="product-image">
                <img src={img} alt=""/>
            </div>
            <div className="product-title">
                <h2><Link to={"/product/" + key}>{name}</Link></h2> 
                <p><small>{seller}</small></p>
                <p><small>Only {stock} left in stock</small></p> 
                <p><small>${price}</small></p> 
                <p><small>${shipping}</small></p>
                { props.addShowButton === true && <button 
                className="cart-button" 
                onClick={() =>props.handleAddCart(props.product)}
                > <FontAwesomeIcon icon={faShoppingCart} /> add to cart</button>
                }
            </div>
        </div>
    );
};

export default Product;