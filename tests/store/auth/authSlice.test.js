import { authSlice, checkingCredentials, login, logout } from "../../../src/store/auth/authSlice";
import { authtenticatedState, demoUser, initialState } from "../../fixtures/authFixtures";

describe("Pruebas sobre Auth/authSlice.js", () => {
  test('01 debe regresear el estado inicial y llamarse "auth', () => {
    const state = authSlice.reducer(initialState, {});

    expect(authSlice.name).toBe("auth");
    expect(state).toEqual(initialState);
  });

  test("02 debe hacer la autenticación ", () => {
    const state = authSlice.reducer(initialState, login(demoUser));
    // console.log(state);
    expect(state).toEqual({
      status: "authenticated",
      errorMessage: null,
      ...demoUser,
    });
  });

  test("03 debe realizar el logout sin argumentos", () => {
    const loggedState = authSlice.reducer(initialState, login(demoUser));
    // console.log(loggedState);
    const newState = authSlice.reducer(loggedState, logout());
    // console.log(newState);

    expect(newState).toEqual({
      ...initialState,
      status: "not-authenticated",
      errorMessage: undefined,
    });
  });

  test("04 debe realizar el logout con argumentos", () => {
    const msg = "Usuario/contraseña no válidos";
    const loggedState = authSlice.reducer(initialState, login(demoUser));
    // console.log(loggedState);
    const newState = authSlice.reducer(loggedState, logout(msg));
    // console.log(newState);

    expect(newState).toEqual({
      ...initialState,
      status: "not-authenticated",
      errorMessage: msg,
    });
  });

  test("05 debe cambiar el estado a checking", () => {
    const state = authSlice.reducer(authtenticatedState, checkingCredentials());
    // console.log(state);
    expect(state.status).toEqual("checking");
  });
});
