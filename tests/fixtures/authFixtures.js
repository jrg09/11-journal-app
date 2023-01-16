export const initialState = {
  status: "checking", //not-authenticated, checking, authtenticated
  uid: null,
  email: null,
  displayName: null,
  photoURL: null,
  errorMessage: null,
};

export const authtenticatedState = {
  status: "authtenticated", //not-authenticated, checking, authtenticated
  uid: "123abc",
  email: "jorge@mail.es",
  displayName: "Jorge",
  photoURL: "https:/demo.com/img.jpg",
  errorMessage: null,
};

export const notAuthenticatedState = {
  status: "not-authenticated", //not-authenticated, checking, authtenticated
  uid: null,
  email: null,
  displayName: null,
  photoURL: null,
  errorMessage: null,
};

export const demoUser = {
  uid: "123abc",
  email: "jorge@mail.es",
  displayName: "Jorge",
  photoURL: "https:/demo.com/img.jpg",
};
