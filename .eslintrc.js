module.exports = {
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  plugins: [
    'react'
  ],
  'env': {
    browser: true,
    node: true
  },
  rules: {
    quotes: ['error', 'single'],
    indent: ['error', 2, { SwitchCase: 1 }],
    'no-console': 'off'
  }
};
