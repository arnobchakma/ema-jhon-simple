import React, { useState } from 'react';
import fakeData from '../../fakeData';
import './Shop.css';
import Product from '../Product/Product'
import Cart from '../Cart/Cart';

const Shop = () => {
    const firstTen = fakeData.slice(0, 10);
    const [products, setProducts] = useState(firstTen);
    const [cart, setCart] = useState([]);

    const handleAddCart = (product) => {
        const newCount = [...cart, product];
        setCart(newCount);
    }

    return (
        <div className="shop-container">
            <div className="product-container">
                {
                    products.map(product => <Product handleAddCart={handleAddCart} product={product}></Product>) 
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}></Cart>
            </div>         
        </div>
    );
};

export default Shop;