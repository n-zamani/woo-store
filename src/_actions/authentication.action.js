import { authenticationConstants } from '../_constants';
import { authenticationService } from '../_service';
import { cartAction } from './cart.action'

export const authenticationAction = {
    login,
    register,
    logout
};

function register(username, first_name, last_name, email, password, history) {
    return dispatch => {
        dispatch(request({ username, first_name, last_name, email, password }));

        authenticationService.register(username, first_name, last_name, email, password)
            .then(
                response => {
                    dispatch(success(response));
                    history.push('/login');
                },
                error => {
                    dispatch(fail(error));
                }
            )
    };

    function request(user) { return { type: authenticationConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: authenticationConstants.REGISTER_SUCCESS, user } }
    function fail(error) { return { type: authenticationConstants.REGISTER_FAILED, error } }
}

function login(username, password, history) {
    return dispatch => {
        dispatch(request({ username, password }));

        authenticationService.login(username, password)
            .then(
                response => {
                    dispatch(success(response));
                    localStorage.setItem('token', response.token);
                    localStorage.setItem('email', response.user_email);
                    history.push('/user');
                },
                error => {
                    dispatch(fail(error));
                }
            );
    };

    function request(user) { return { type: authenticationConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: authenticationConstants.LOGIN_SUCCESS, user } }
    function fail(error) { return { type: authenticationConstants.LOGIN_FAILED, error } }
}

function logout(history) {
    return dispatch => {
        dispatch(success());
        localStorage.clear();
        dispatch(cartAction.emptyCart());
        history.push('/');
    }

    function success() { return { type: authenticationConstants.LOGOUT } }
}