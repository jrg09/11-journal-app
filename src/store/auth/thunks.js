import {
  registerWithEmailPassword,
  signInWithGoogle,
  signInWithEmailPassword,
  logoutFirebase,
} from "../../firebase/providers";
import { checkingCredentials, login, logout } from "./authSlice";

export const checkingAuthentication = (email, password) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());

    //call api
  };
};

export const startGoogleSignIn = () => {
  return async (dispatch) => {
    dispatch(checkingCredentials());

    //call api
    const result = await signInWithGoogle(); //{ok:true/false ...}

    if (!result.ok) return dispatch(logout(result.errorMessage));

    dispatch(login(result));
  };
};

export const startRegisterUserWithEmailAndPassword = ({
  name,
  email,
  password,
}) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());

    const result = await registerWithEmailPassword({ name, email, password });

    console.log(result);

    if (!result.ok) return dispatch(logout(result.errorMessage));

    dispatch(login(result));
  };
};

export const startSignInWithEmailAndPassword = ({ email, password }) => {
  console.log({ email, password });
  return async (dispatch) => {
    dispatch(checkingCredentials());

    const result = await signInWithEmailPassword({ email, password });

    if (!result.ok) return dispatch(logout(result.errorMessage));

    dispatch(login(result));
  };
};

export const startLogout = () => {
  return async (dispatch) => {
    await logoutFirebase();

    dispatch(logout());
  };
};
