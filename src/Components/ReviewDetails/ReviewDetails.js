import React from 'react';
import './ReviewDetail.css';

const ReviewDetails = (props) => {
    const {name, price, quantity, seller, stock, key} = props.product;
    return (
        <div className="review-style">
            <h3>{name}</h3>
            <p>$ {price}</p>
            <p>{quantity}</p>
            <p>{seller}</p>
            <p>{stock}</p>
            <button 
            className="cart-button"
            onClick={() =>props.removeProduct(key)}
            >remove</button>  
        </div>
    );
};

export default ReviewDetails;