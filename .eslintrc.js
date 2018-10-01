module.exports = {
  root: true,
  parserOptions: {
    ecmaFeatures: {
      modules: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
    node: true,
    es6: true
  },
  extends: ['eslint:recommended', 'prettier'],
  // required to lint *.vue files
  plugins: ['html', 'prettier'],
  // add your custom rules here
  rules: {
    // 'space-before-function-paren': ['error', 'never'],
    'sort-imports': [
      'error',
      {
        ignoreCase: false,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single']
      }
    ],
    'sort-vars': 'error',
    'prettier/prettier': [
      'error',
      {
        printWidth: 200,
        singleQuote: true,
        semi: false
      }
    ]
  },
  globals: {}
}
