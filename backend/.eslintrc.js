module.exports = {
  root: true,
  env: {
    commonjs: true,
    es6: true,
    node: true,
  },
  extends: ['standard', 'prettier', 'prettier/standard'],
  plugins: ['import', 'prettier', 'standard'],
  parserOptions: {
    ecmaVersion: 11,
  },
  rules: {
    'space-before-function-paren': 0,
    'new-cap': 0
  },
}
