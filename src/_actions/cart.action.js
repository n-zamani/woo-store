import { cartConstants } from '../_constants';

export const cartAction = {
    addToCart,
    increaseProduct,
    decreaseProduct,
    changeQuantity,
    removeProduct,
    emptyCart
}

function addToCart(product) {
    return dispatch => {
        dispatch(addProduct(product));
    };

    function addProduct(product) { return { type: cartConstants.ADD_TO_CART, addedProduct: product } }
}

function increaseProduct(id) {
    return dispatch => {
        dispatch(increase(id));
    }

    function increase(id) { return { type: cartConstants.INCREASE_PRODUCT, increasingProduct: { id } } }
}

function decreaseProduct(id) {
    return dispatch => {
        dispatch(decrease(id))
    }

    function decrease(id) { return { type: cartConstants.DECREASE_PRODUCT, decreasingProduct: { id } } }
}

function changeQuantity(id, value) {
    return dispatch => {
        dispatch(change(id, value))
    }

    function change(id, qty) { return { type: cartConstants.CHANGE_QUANTITY, changedProduct: { id, qty } } }
}

function removeProduct(id) {
    return dispatch => {
        dispatch(remove(id))
    }

    function remove(id) { return { type: cartConstants.REMOVE_PRODUCT, removedProduct: { id } } }
}

function emptyCart() {
    return dispatch => {
        dispatch(empty());
    };

    function empty() {return {type: cartConstants.EMPTY_CART}}
}