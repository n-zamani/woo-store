import { userConstants } from "../_constants";
import { userService } from "../_service";

export const userAction = {
    getUser,
    getOrders,
    listItems,
    editAddress,
    editUser,
    clearInfo
}

function getUser(email,history) {
    return dispatch => {

        dispatch(request());

        userService.getUser(email)
            .then(
                response => {
                    localStorage.setItem('userid', JSON.stringify(response[0].id));
                    dispatch(success(response[0]));
                },
                error => {
                    dispatch(fail(error));
                    localStorage.removeItem('token');
                    localStorage.removeItem('email');
                    localStorage.removeItem('userid');
                    history.push('/login');
                }
            )
    }

    function request() {return {type: userConstants.GET_USER_REQUEST}}
    function success(user) {return {type: userConstants.GET_USER_SUCCESS, user}}
    function fail(error) {return {type: userConstants.GET_USER_FAIL, error}}
}

function getOrders(id) {
    return dispatch => {

        dispatch(request());

        userService.getOrders(id)
        .then(
            response => {
                dispatch(success(response));
            },
            error => {
                dispatch(fail(error));
            }
        )
    }

    function request() {return {type: userConstants.USER_ORDERS_REQUEST}}
    function success(orders) {return {type: userConstants.USER_ORDERS_SUCCESS, orders}}
    function fail(error) {return {type: userConstants.USER_ORDERS_FAIL, error}}
}

function listItems(ids) {
    return dispatch => {

        dispatch(request());

        userService.listItems(ids)
        .then(
            response => {
                dispatch(success(response));
            }
        )        
    }

    function request() {return {type: userConstants.LIST_ITEMS_REQUEST}}
    function success(items) {return {type: userConstants.LIST_ITEMS_SUCCESS, items}}
}

function editAddress(address, email, id) {
    return dispatch => {
        
        dispatch(request());

        userService.editAddress(address, email, id)
        .then(
            response => {
                dispatch(success(response));
            }
        )
    }

    function request() {return {type: userConstants.EDIT_ADDRESS_REQUEST}}
    function success(user) {return {type: userConstants.EDIT_ADDRESS_SUCCESS, user}}
}

function editUser(user, id) {
    return dispatch => {
        
        dispatch(request());

        userService.editUser(user, id)
        .then(
            response => {
                dispatch(success(response));
                localStorage.setItem('email', JSON.stringify(response[0].email));
            }
        )
    }

    function request() {return {type: userConstants.EDIT_USER_REQUEST}}
    function success(user) {return {type: userConstants.EDIT_USER_SUCCESS, user}}
}

function clearInfo() {
    return dispatch => {
        dispatch(clear());
    }

    function clear() {return {type: userConstants.CLEAR_INFO}}
}