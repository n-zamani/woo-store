import { authenticationConstants } from "../_constants";

export function authentication(state = {}, action) {
    switch (action.type) {
      case authenticationConstants.REGISTER_REQUEST:
        return { registerRequest: true };
      case authenticationConstants.REGISTER_SUCCESS:
        return {registerRequest: false};
      case authenticationConstants.REGISTER_FAILED:
        return {};
      default:
        return state;
    }
  }