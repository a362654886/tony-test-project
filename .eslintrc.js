module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: "module",
  },
  extends: ["eslint:recommended"],
  rules: {
    "no-var": "error",
    eqeqeq: "error",
    quotes: ["error", "double"],
    semi: ["error", "always"],
    "no-unused-vars": "error",
    "no-console": "error",
    "no-empty": "error",
    "comma-spacing": "error",
    "comma-dangle": ["error", "always-multiline"],
    "no-eval": "error",
    strict: ["error", "global"],
  },
};
