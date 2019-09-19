import { productConstants } from '../_constants';
import { productService } from '../_service';

export const productAction = {
    getProduct
}

function getProduct(id) {
    return dispatch => {
        dispatch(requestProduct());

        productService.fetchProduct(id).then(
            response => {
                dispatch(receiveProduct(response));
            }
        )
    };

    function requestProduct() { return { type: productConstants.REQUEST_PRODUCT } }
    function receiveProduct(product) { return { type: productConstants.RECEIVE_PRODUCT, product } }
}