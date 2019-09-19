import { cartConstants } from '../_constants';

const initialState = { cartProducts: { totalQty: 0, totalPrice: 0 } }

export function cart(state = initialState, action) {
    switch (action.type) {
        case cartConstants.ADD_TO_CART:
            return {
                ...state,
                cartProducts: {
                    ...state.cartProducts,
                    [action.addedProduct.id]: state.cartProducts[action.addedProduct.id] ?
                        { ...state.cartProducts[action.addedProduct.id], qty: state.cartProducts[action.addedProduct.id].qty + 1 } :
                        { ...action.addedProduct, qty: 1 },
                    totalQty: state.cartProducts.totalQty + 1,
                    totalPrice: state.cartProducts.totalPrice + +action.addedProduct.price
                }
            }
        case cartConstants.INCREASE_PRODUCT:
            return {
                ...state, cartProducts: {
                    ...state.cartProducts,
                    [action.increasingProduct.id]: {
                        ...state.cartProducts[action.increasingProduct.id],
                        qty: +state.cartProducts[action.increasingProduct.id].qty + 1
                    },
                    totalQty: state.cartProducts.totalQty + 1,
                    totalPrice: state.cartProducts.totalPrice + +state.cartProducts[action.increasingProduct.id].price
                }
            }
        case cartConstants.DECREASE_PRODUCT:
            if (state.cartProducts[action.decreasingProduct.id].qty === 1) {
                const removedPrice = +state.cartProducts[action.decreasingProduct.id].price;
                delete state.cartProducts[action.decreasingProduct.id];
                return {
                    ...state, cartProducts: {
                        ...state.cartProducts,
                        totalQty: state.cartProducts.totalQty - 1,
                        totalPrice: state.cartProducts.totalPrice - removedPrice
                    }
                };
            }
            return {
                ...state, cartProducts: {
                    ...state.cartProducts,
                    [action.decreasingProduct.id]: {
                        ...state.cartProducts[action.decreasingProduct.id],
                        qty: +state.cartProducts[action.decreasingProduct.id].qty - 1
                    },
                    totalQty: state.cartProducts.totalQty - 1,
                    totalPrice: state.cartProducts.totalPrice - +state.cartProducts[action.decreasingProduct.id].price
                }
            };
        case cartConstants.CHANGE_QUANTITY:
            return { ...state, cartProducts: {
                ...state.cartProducts,
                [action.changedProduct.id]: {
                    ...state.cartProducts[action.changedProduct.id],
                    qty: +action.changedProduct.qty
                },
                totalQty: state.cartProducts.totalQty - +state.cartProducts[action.changedProduct.id].qty + +action.changedProduct.qty,
                totalPrice: state.cartProducts.totalPrice - +state.cartProducts[action.changedProduct.id].qty * +state.cartProducts[action.changedProduct.id].price + +state.cartProducts[action.changedProduct.id].price * +action.changedProduct.qty
            }}
        case cartConstants.REMOVE_PRODUCT:
            const removedPrice = +state.cartProducts[action.removedProduct.id].price;
            const removedQty = +state.cartProducts[action.removedProduct.id].qty;
            delete state.cartProducts[action.removedProduct.id];
            return {
                ...state, cartProducts: {
                    ...state.cartProducts,
                    totalQty: state.cartProducts.totalQty - removedQty,
                    totalPrice: state.cartProducts.totalPrice - removedPrice * removedQty
                }
            };
        default:
            return state;
    }
}