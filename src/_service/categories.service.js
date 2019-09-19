import { HOST, KEY } from '../_constants';

export const categoriesService = {
    fetchCategories
};

async function fetchCategories() {
    return await fetch(`${HOST}products/categories/?per_page=100&${KEY}`,{
        method: 'GET'
    })
    .then(response=>response.json())
}