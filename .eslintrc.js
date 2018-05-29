module.exports = {
  extends: ['plugin:react/recommended', 'google'],
  parser: 'babel-eslint',
  env: {
    browser: 1,
  },
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 8,
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
    },
  },
  rules: {
    'object-curly-spacing': 0,
    'max-len': [1, { code: 120 }],
    'valid-jsdoc': 0,
    'require-jsdoc': 0,
    'react/display-name': 0,
    'no-invalid-this': 0,
    'react/prop-types': 0,
    semi: 0,
  },
  globals: {
    window: true,
    document: true,
  },
}
