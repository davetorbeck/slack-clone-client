module.exports = {
  extends: ["plugin:react/recommended", "google"],
  parserOptions: {
    sourceType: "module",
    ecmaVersion: 8,
    ecmaFeatures: {
      experimentalObjectRestSpread: true
    }
  },
  rules: {
    "object-curly-spacing": 0,
    "max-len": [1, { code: 120 }],
    "valid-jsdoc": 0,
    "require-jsdoc": 0,
    "react/display-name": 0
  },
  globals: {
    window: true,
    document: true
  }
};
