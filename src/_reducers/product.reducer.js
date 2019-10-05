import {productConstants} from '../_constants';

const initialState = {productRequest: false, receivedProduct: {}}

export function product(state=initialState, action) {
    switch (action.type) {
        case productConstants.REQUEST_PRODUCT:
          return {productRequest: true, receivedProduct: {}};
        case productConstants.RECEIVE_PRODUCT:
          return {productRequest: false, receivedProduct: action.product};
        default:
          return state;
      }
}