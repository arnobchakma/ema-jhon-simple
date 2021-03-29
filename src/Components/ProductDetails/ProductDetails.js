import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Product from '../Product/Product';

const ProductDetails = () => {
    const {productKey} = useParams();
    const [product, setProduct] = useState({})

    useEffect(() => {
        fetch('https://peaceful-journey-93670.herokuapp.com/product/' + productKey)
        .then(res => res.json())
        .then(data => setProduct(data))
    }, [productKey])
    // const product = fakeData.find(product => product.key === productKey)

    return (
        <div>
            <h2>This is product Details</h2>
            <Product addShowButton={false} product={product}></Product>
        </div>
    );
};

export default ProductDetails;