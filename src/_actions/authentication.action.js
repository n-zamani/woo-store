import { authenticationConstants } from '../_constants';
import { authenticationService } from '../_service';

export const authenticationAction = {
    // login,
    register
};

function register(username,email,password,history) {
    return dispatch => {
        dispatch(request({username,email,password}));

        authenticationService.register(username,email,password)
            .then(
                response => {
                    dispatch(success(response));
                    history.push('/');
                }
            );
    };

    function request(user) { return { type: authenticationConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: authenticationConstants.REGISTER_SUCCESS, user } }
}