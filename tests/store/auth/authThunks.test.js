import {
  logoutFirebase,
  registerWithEmailPassword,
  signInWithEmailPassword,
  signInWithGoogle,
} from "../../../src/firebase/providers";
import { checkingCredentials, login, logout } from "../../../src/store/auth/authSlice";
import {
  checkingAuthentication,
  startGoogleSignIn,
  startLogout,
  startRegisterUserWithEmailAndPassword,
  startSignInWithEmailAndPassword,
} from "../../../src/store/auth/thunks";
import { demoUser } from "../../fixtures/authFixtures";

jest.mock("../../../src/firebase/providers");

describe("Pruebas en Auth/Thunks", () => {
  const dispatch = jest.fn();

  beforeEach(() => jest.clearAllMocks());

  test("01 debe invocar el checkingCredentials", async () => {
    const fn = await checkingAuthentication();
    fn(dispatch);

    expect(dispatch).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
  });

  test("02 debe hacer signin con google startGoogleSignIn", async () => {
    const loginData = { ok: true, ...demoUser };

    await signInWithGoogle.mockResolvedValue(loginData);

    await startGoogleSignIn()(dispatch);

    //validar que se hayan llamado las funciones dentro de startGoogleSignIn
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(login(loginData));
  });

  test("03 startGoogleSignIn debe de llamar checkingCredentials y logout con error", async () => {
    const loginData = { ok: false, errorMessage: "Error con autenticación de Google" };

    await signInWithGoogle.mockResolvedValue(loginData);

    await startGoogleSignIn()(dispatch);

    //validar que se hayan llamado las funciones dentro de startGoogleSignIn
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(logout(loginData.errorMessage));
  });

  test("04 pruebas sobre startRegisterUserWithEmailAndPassword, con email/pass y result ok", async () => {
    const user = { name: "Jorge", email: "jorge@mail.es", password: "jorge1." };
    const registerData = { ok: true, ...user };

    await registerWithEmailPassword.mockResolvedValue({ ...registerData });

    await startRegisterUserWithEmailAndPassword(user)(dispatch);

    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(login(registerData));
  });

  test("04a pruebas sobre startRegisterUserWithEmailAndPassword, con email/pass y result error", async () => {
    const user = { name: "Jorge", email: "jorge@mail.es", password: "jorge1." };
    const registerData = { ok: false, errorMessage: "falló" };

    await registerWithEmailPassword.mockResolvedValue({ ...registerData });

    await startRegisterUserWithEmailAndPassword(user)(dispatch);

    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(logout(registerData.errorMessage));
  });

  test("05 pruebas sobre startSignInWithEmailAndPassword, con email/pass y result ok", async () => {
    const user = { email: "jorge@mail.es", password: "jorge1." };
    const loginData = { ok: true, ...demoUser };

    await signInWithEmailPassword.mockResolvedValue(loginData);

    await startSignInWithEmailAndPassword(user)(dispatch);

    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(login(loginData));
  });

  test("05a pruebas sobre startSignInWithEmailAndPassword, con email/pass y result error", async () => {
    const user = { email: "jorge@mail.es", password: "jorge1." };
    const loginData = { ok: false, errorMessage: "Inicio de sesión falló" };

    await signInWithEmailPassword.mockResolvedValue(loginData);

    await startSignInWithEmailAndPassword(user)(dispatch);

    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(logout(loginData.errorMessage));
  });

  test("06 prtuebas sobre logout", async () => {
    await startLogout()(dispatch);

    expect(logoutFirebase).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(logout());
  });
});
