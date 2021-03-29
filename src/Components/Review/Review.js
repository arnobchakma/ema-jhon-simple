import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewDetails from '../ReviewDetails/ReviewDetails';
import completeImage from '../../images/giphy.gif'
import { useHistory } from 'react-router';

const Review = () => {
    const [cart, setCart] = useState([]);
    const [orderPlace, setOrderPlace] = useState(false);
    const history = useHistory();

    const handleProceedCheckout = () => {
        history.push('/shipment')
        // setCart([]);
        // setOrderPlace(true);
        // processOrder();
    }
    // selected product remove from list start
    const removeProduct = (productKey) => {
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart)
    // selected product remove from list end

    // Now directly local store teke cartgulo remove korara jonne
        removeFromDatabaseCart(productKey);
    }
    useEffect(() => {
        const saveCart = getDatabaseCart();
        const productKeys = Object.keys(saveCart);
        const cartProducts = productKeys.map(key => {
            const product = fakeData.find(product => product.key === key);
            product.quantity = saveCart[key];
            return product;
        })
        setCart(cartProducts)

        // fetch('https://peaceful-journey-93670.herokuapp.com/productsByKeys', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(productKeys)
        // })
        // .then(res => res.json())
        // .then(data => setCart(data))

    }, []);
    
    let thankYou;
    if(orderPlace ){
        thankYou = <img src={completeImage} alt=""/>
    }

    return (
        <div className="double-container">
            <div className="product-container">
                {
                    cart.map(product => <ReviewDetails 
                        removeProduct={removeProduct}
                        key={product.key}
                        product={product}
                    ></ReviewDetails>)
                }
                {
                    thankYou
                }
            </div>
            <div className="cart-container">
                <Cart cart="cart"></Cart>
                <button
                onClick={handleProceedCheckout}
                className="cart-button"
                >Proceed Checkout</button>
            </div>
            
        </div>
    );
};

export default Review;