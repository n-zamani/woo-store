import {orderConstants} from '../_constants';

const initialState = {}

export function order(state=initialState,action) {
    switch(action.type) {
        case orderConstants.SHIPPING_METHOD_REQUEST:
            return state;
        case orderConstants.SHIPPING_METHOD_SUCCESS:
            return {...state, shipMethods: action.shippingMethods};
        case orderConstants.PAYMENT_METHOD_REQUEST:
            return state;
        case orderConstants.PAYMENT_METHOD_SUCCESS:
            return {...state, payMethods: action.paymentMethods};
        case orderConstants.CREATE_ORDER_REQUEST:
            return state;
        case orderConstants.CREATE_ORDER_SUCCESS:
            localStorage.removeItem('cart');
            return {...state, order: action.order};
        default:
            return state;
    }
}