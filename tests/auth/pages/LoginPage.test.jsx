import { configureStore } from "@reduxjs/toolkit";
import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { LoginPage } from "../../../src/auth/pages/LoginPage";
import { authSlice, journalSlice } from "../../../src/store";
import { notAuthenticatedState } from "../../fixtures/authFixtures";
import {} from "../../../src/store/auth/thunks";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    journal: journalSlice.reducer,
  },
  preloadedState: {
    auth: notAuthenticatedState,
  },
});

const mockStartGoogleSignIn = jest.fn();
const mockStartSignInWithEmailAndPassword = jest.fn();

jest.mock("../../../src/store/auth/thunks", () => ({
  startGoogleSignIn: () => mockStartGoogleSignIn,
  startSignInWithEmailAndPassword: ({ email, password }) => {
    return () => mockStartSignInWithEmailAndPassword({ email, password });
  },
}));

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => (fn) => fn(),
}));

describe("Pruebas en <LoginPage />", () => {
  beforeEach(() => jest.clearAllMocks());

  test("01 componente se renderiza correctamente", () => {
    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    expect(container).toMatchSnapshot();
    expect(screen.getAllByText("Inicio de sesión").length).toBeGreaterThan(0);
  });

  test("02 debe llamarse el boton onGoogleSignIn", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    // screen.debug();

    const button = screen.getByLabelText("googleSignInButton");

    fireEvent.click(button);

    expect(mockStartGoogleSignIn).toHaveBeenCalled();
    expect(mockStartGoogleSignIn).toHaveBeenCalledWith();
  });

  test("03 debe llamarse onSubmit con email & password", () => {
    const email = "jorge@mail.es";
    const password = "jorge1";

    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    // screen.debug();

    const emailInput = screen.getByRole("textbox", { name: "Correo" });
    fireEvent.change(emailInput, { target: { name: "email", value: email } });

    //const passwordInput = screen.getByLabelText("passwordText");
    const passwordInput = screen.getByTestId("password");
    fireEvent.change(passwordInput, { target: { name: "password", value: password } });

    const form = screen.getByLabelText("submit-form");
    fireEvent.submit(form);

    expect(mockStartSignInWithEmailAndPassword).toHaveBeenCalled();
    expect(mockStartSignInWithEmailAndPassword).toHaveBeenLastCalledWith({ email, password });
  });
});
