import { HOST, KEY } from '../_constants';

export const productService = {
    fetchProduct
};

async function fetchProduct(id) {
    return await fetch(`${HOST}products/${id}/?${KEY}`,{
        method: 'GET'
    })
    .then(response=>response.json())
}