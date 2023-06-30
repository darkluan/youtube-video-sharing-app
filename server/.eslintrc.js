module.exports = {
  extends: ["eslint:recommended"],
  plugins: ["prettier"],
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
    mocha: true,
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
  rules: {
    "object-curly-spacing": [2, "always"],
    strict: 0,
    semi: [1, "always"],
    "keyword-spacing": [2, { before: true, after: true }],
    "space-infix-ops": 2,
    "spaced-comment": ["warn", "always"],
    "arrow-spacing": 2,
    "no-console": 0,
  },
};
