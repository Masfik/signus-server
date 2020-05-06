module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  extends: ["airbnb-typescript", "prettier", "prettier/@typescript-eslint"],
  parserOptions: {
    project: "./tsconfig.json"
  },
  rules: {
    "no-underscore-dangle": "off",
    "no-console": "off"
  }
};
