import {productsConstants} from '../_constants';

const initialState = {productsRequest: false, receivedProducts: []}

export function products(state=initialState, action) {
    switch (action.type) {
        case productsConstants.REQUEST_PRODUCTS:
          return {productsRequest: true, receivedProducts: []};
        case productsConstants.RECEIVE_PRODUCTS:
            return {productsRequest: false, receivedProducts: action.products};
        default:
          return state;
      }
}