import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FirebaseAuth } from "../firebase/config";
import { login, logout, startLoadingNotes } from "../store";

export const useCheckAuth = () => {
  const { status } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(FirebaseAuth, async (user) => {
      //console.log("onAuthStateChanged", user);
      if (!user) return dispatch(logout());

      //hay un usuario autenticado
      const { email, displayName, photoURL, uid } = user;

      dispatch(login({ ok: true, email, displayName, photoURL, uid }));
      dispatch(startLoadingNotes());
    });
  }, []);

  return status;
};
