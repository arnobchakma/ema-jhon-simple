import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import './Product.css';

const Product = (props) => {
    // console.log(props)
    const {
        name, 
        img, 
        seller, 
        stock, 
        price, 
        shipping
    }= props.product;
    return (
        <div className="single-product">
            <div className="product-image">
                <img src={img} alt=""/>
            </div>
            <div className="product-title">
                <h2>{name}</h2> <br/>
                <p><small>{seller}</small></p> <br/>
                <p><small>Only {stock} left in stock</small></p> <br/>
                <p><small>${price}</small></p> <br/>
                <p><small>${shipping}</small></p> <br/>
                <button className="cart-button" onClick={() =>props.handleAddCart(props.product)}> <FontAwesomeIcon icon={faShoppingCart} /> add to cart</button>
            </div>
        </div>
    );
};

export default Product;