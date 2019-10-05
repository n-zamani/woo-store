import {orderConstants} from '../_constants';
import {orderService} from '../_service'

export const orderAction = {
    shippingMethods,
    paymentMethods,
    createOrder
}

function shippingMethods() {
    return dispatch => {
        dispatch(request());

        orderService.getShippingMethods().then(
            response => {
                dispatch(success(response));
            }
        )
    };

    function request() {return {type: orderConstants.SHIPPING_METHOD_REQUEST}}
    function success(shippingMethods) {return {type: orderConstants.SHIPPING_METHOD_SUCCESS, shippingMethods}}
}

function paymentMethods() {
    return dispatch => {
        dispatch(request());

        orderService.getPaymentMethods().then(
            response => {
                dispatch(success(response));
            }
        )
    };

    function request() {return {type: orderConstants.PAYMENT_METHOD_REQUEST}}
    function success(paymentMethods) {return {type: orderConstants.PAYMENT_METHOD_SUCCESS, paymentMethods}}
}

function createOrder(address,shippingMethod,paymentMethod) {
    return dispatch => {
        dispatch(request());

        orderService.createOrder(address,shippingMethod,paymentMethod).then(
            response => {
                dispatch(success(response));
            }
        )
    };

    function request() {return {type: orderConstants.CREATE_ORDER_REQUEST}}
    function success(order) {return {type: orderConstants.CREATE_ORDER_SUCCESS, order}}
}