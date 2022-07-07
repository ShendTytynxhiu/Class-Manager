import { SIGN_IN, SIGN_UP, SIGN_OUT } from "./auth.types";

export const userSignIn = (username, email, id, auth_token, is_teacher) => {
  return {
    type: SIGN_IN,
    username: username,
    email: email,
    id: id,
    auth_token: auth_token,
    is_teacher: is_teacher,
  };
};

export const userSignUp = (username, email, id, auth_token, is_teacher) => {
  return {
    type: SIGN_UP,
    username: username,
    email: email,
    id: id,
    auth_token: auth_token,
    is_teacher: is_teacher,
  };
};

export const userSignOut = () => {
  return {
    type: SIGN_OUT,
  };
};
