import { userConstants } from "../_constants";

const initialState = { user: {}, orders: [], itemsList: [] }

export function userInfo(state = initialState, action) {
    switch (action.type) {
        case userConstants.GET_USER_REQUEST:
            return state;
        case userConstants.GET_USER_SUCCESS:
            return { ...state, user: action.user };
        case userConstants.GET_USER_FAIL:
            return { ...state, error: action.error };
        case userConstants.USER_ORDERS_REQUEST:
            return state;
        case userConstants.USER_ORDERS_SUCCESS:
            return { ...state, orders: action.orders };
        case userConstants.USER_ORDERS_FAIL:
            return { ...state, error: action.error };
        case userConstants.LIST_ITEMS_REQUEST:
            return state;
        case userConstants.LIST_ITEMS_SUCCESS:
            return { ...state, itemsList: action.items };
        case userConstants.EDIT_ADDRESS_REQUEST:
            return state;
        case userConstants.EDIT_ADDRESS_SUCCESS:
            return { ...state, user: action.user };
        case userConstants.EDIT_USER_REQUEST:
            return state;
        case userConstants.EDIT_USER_SUCCESS:
            return { ...state, user: action.user };
        case userConstants.CLEAR_INFO:
            return initialState;
        default:
            return state;
    }
}