import React, { useEffect, useState } from 'react';
import './Shop.css';
import Product from '../Product/Product'
import Cart from '../Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { Link } from 'react-router-dom';

const Shop = () => {
    // const firstTen = fakeData.slice(0, 10);
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        fetch('https://peaceful-journey-93670.herokuapp.com/products')
        .then(res => res.json())
        .then(data => setProducts(data))
    }, [])

    useEffect(() =>{
        const saveCart = getDatabaseCart();
        const productKeys = Object.keys(saveCart);
        console.log(products, productKeys)
        if(products.length > 0){
            const previousCart = productKeys.map(existingKey => {
                const product = products.find(pd => pd.key === existingKey);
                product.quantity = saveCart[existingKey];
                return product;
            })
            setCart(previousCart)
        }

        // fetch('https://peaceful-journey-93670.herokuapp.com/productsByKeys', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(productKeys)
        // })
        // .then(res => res.json())
        // .then(data => setCart(data))

    }, [products])

    const handleAddCart = (product) => {
        const toBeAddedKey = product.key;
        const sameProduct = cart.find(pd => pd.key === toBeAddedKey);
        let count = 1;
        let newCart;
        if(sameProduct){
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            let others = cart.filter(pd => pd.key !== toBeAddedKey);
            newCart = [...others, sameProduct]
        }
        else{
            product.quantity = 1;
            newCart = [...cart, product]
        }
        setCart(newCart);
        addToDatabaseCart(product.key, count)
    }
    

    return (
        <div className="double-container">
            <div className="product-container">
                {
                    products.map(product => <Product 
                        key={product.key} 
                        handleAddCart={handleAddCart} 
                        product={product} 
                        addShowButton={true}
                    ></Product>) 
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}></Cart>
                <Link to="/review">
                <button className="cart-button">Order review</button>
                 </Link>
            </div>         
        </div>
    );
};

export default Shop;