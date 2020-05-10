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
    "no-console": "off",
    "class-methods-use-this": "off",
    "no-param-reassign": "off",
    "import/no-cycle": "off",
    "@typescript-eslint/no-use-before-define": "off"
  }
};
