import { HOST, KEY } from '../_constants';

export const productsService = {
    fetchProducts
};

async function fetchProducts(id) {
    return await fetch(`${HOST}products/?category=${id}&per_page=100&${KEY}`,{
        method: 'GET'
    })
    .then(response=>response.json())
}