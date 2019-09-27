import { authenticationConstants } from '../_constants';
import { authenticationService } from '../_service';

export const authenticationAction = {
    login,
    register,
    logout,
    getUser
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
        localStorage.removeItem('token', '');
        localStorage.removeItem('email', '');
        history.push('/');
    }

    function success() { return { type: authenticationConstants.LOGOUT } }
}

function getUser(email) {
    return dispatch => {

        dispatch(request());

        authenticationService.getUser(email)
            .then(
                response => {
                    dispatch(success(response[0]));
                    localStorage.setItem('userid', JSON.stringify(response[0].id));
                },
                error => {
                    dispatch(fail(error));
                    localStorage.removeItem('token', '');
                    localStorage.removeItem('email', '');
                }
            )
    }

    function request() {return {type: authenticationConstants.GET_USER_REQUEST}}
    function success(user) {return {type: authenticationConstants.GET_USER_SUCCESS, user}}
    function fail(error) {return {type: authenticationConstants.GET_USER_FAIL, error}}
}