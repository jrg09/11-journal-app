import "whatwg-fetch";
import "setimmediate";

require("dotenv").config({ path: ".env.test" });

jest.mock("./src/firebase/getEnvironments", () => ({
  getEnvironments: () => ({ ...process.env }),
}));
