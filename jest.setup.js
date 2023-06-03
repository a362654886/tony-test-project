const jest = require("jest");

jest.setTimeout(30000);

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  }),
});

Object.defineProperty(window.document, "cookie", {
  writable: true,
  value: "",
});

module.exports = {
  testEnvironment: "jsdom",
};
