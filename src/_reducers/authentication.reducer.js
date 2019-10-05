import { authenticationConstants } from "../_constants";

export function authentication(state = {}, action) {
    switch (action.type) {
      case authenticationConstants.REGISTER_REQUEST:
        return { ...state, registerRequest: true, user: action.user };
      case authenticationConstants.REGISTER_SUCCESS:
        return { ...state, registerRequest: false, user: action.user };
      case authenticationConstants.REGISTER_FAILED:
        return {...state, registerRequest: false, error: action.error };
      case authenticationConstants.LOGIN_REQUEST:
        return {...state, loginRequest: true, user: action.user};
      case authenticationConstants.LOGIN_SUCCESS:
        return {...state, loginRequest: false, user: action.user};
      case authenticationConstants.LOGIN_FAILED:
        return {...state, loginRequest: false, error: action.error};
      case authenticationConstants.LOGOUT:
        return { ...state, user: {} };
      default:
        return state;
    }
  }