import "@testing-library/jest-dom";
import "whatwg-fetch";
import { server } from "@/tests/mocks/server";

beforeAll(() => {
  // Start the interception.
  server.listen();

  // silence the console.erros and prevent those mesages being logged while running tests
  jest.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
  // Remove any handlers you may have added
  // in individual tests (runtime handlers).
  server.resetHandlers();
});

afterAll(() => {
  // Disable request interception and clean up.
  server.close();

  // restore the console.error
  (console.error as jest.Mock).mockRestore();
});
