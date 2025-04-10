import globals from "globals";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    languageOptions: { 
      globals: globals.node
    },
    rules: {
      semi: ["warn", "always"]
    },
    plugins: {
      extends: ["js/recommended"]
    }
  }
];