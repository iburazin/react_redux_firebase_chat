import { authConstants } from "../actions/constants";

const initState = {
  username: "",
  email: "",
  authenticating: false,
  authenticated: false,
  error: null
};

export default (state = initState, action) => {
  console.log(action);

  switch (action.type) {
    case authConstants.USER_LOGIN_REQUEST:
      state = {
        ...state,
        authenticating: true
      };
      break;
    case authConstants.USER_LOGIN_SUCCESS:
      state = {
        ...state,
        ...action.payload.user,
        authenticating: false,
        authenticated: true
      };
      break;
    case authConstants.USER_LOGIN_FAILURE:
      state = {
        ...state,
        authenticating: false,
        authenticated: false,
        error: action.payload.error
      };
      break;
    case authConstants.USER_LOGOUT_REQUEST:
      break;
    case authConstants.USER_LOGOUT_SUCCESS:
      state = {
        ...initState
      };
      break;
    case authConstants.USER_LOGOUT_FAILURE:
      state = {
        ...state,
        error: action.payload.error
      };
      break;
    default:
      return state;
  }

  return state;
};
