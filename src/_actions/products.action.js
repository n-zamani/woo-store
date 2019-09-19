import { productsConstants } from '../_constants';
import { productsService } from '../_service';

export const productsAction = {
    getProducts
}

function getProducts(id) {
    return dispatch => {
        dispatch(requestProducts());

        productsService.fetchProducts(id).then(
            response => {
                dispatch(receiveProducts(response));
            }
        )
    };

    function requestProducts() { return { type: productsConstants.REQUEST_PRODUCTS } }
    function receiveProducts(products) { return { type: productsConstants.RECEIVE_PRODUCTS, products } }
}