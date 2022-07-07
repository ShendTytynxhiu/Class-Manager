import { SIGN_IN, SIGN_UP, SIGN_OUT } from "./auth.types";

const INITIAL_STATE = {
  username: "",
  email: "",
  id: "",
  auth_token: "",
  is_teacher: "",
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_IN:
      return {
        ...state,
        username: action.username,
        email: action.email,
        id: action.id,
        auth_token: action.auth_token,
        is_teacher: action.is_teacher,
      };
    case SIGN_UP:
      return {
        ...state,
        username: action.username,
        email: action.email,
        id: action.id,
        auth_token: action.auth_token,
        is_teacher: action.is_teacher,
      };
    case SIGN_OUT:
      return {
        ...state,
        username: "",
        email: "",
        id: "",
        auth_token: "",
      };
    default:
      return state;
  }
};

export default reducer;
