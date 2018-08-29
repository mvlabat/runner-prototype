module.exports = {
  'extends': [
    'airbnb-base',
    'plugin:vue/essential',
  ],
  'parserOptions': {
    'ecmaVersion': 2017,
    'sourceType': 'module',
  },
  'env': {
    'browser': true,
  },
  'settings': {
    'import/resolver': {
      "babel-module": {},
    },
  },
  'rules': {
    'import/extensions': ['error', 'always', {
      js: 'never',
      mjs: 'never',
    }],
    quotes: ['error', 'single', { 'avoidEscape': true }],
    'no-use-before-define': ['error', { 'functions': false }],
    'no-restricted-syntax': [
      'error',
      {
        selector: 'ForInStatement',
        message: 'for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.',
      },
      {
        selector: 'LabeledStatement',
        message: 'Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.',
      },
      {
        selector: 'WithStatement',
        message: '`with` is disallowed in strict mode because it makes code impossible to predict and optimize.',
      },
    ],
    'no-param-reassign': ['error', {
      props: true,
      ignorePropertyModificationsFor: [
        'acc', // for reduce accumulators
        'e', // for e.returnvalue
        'rendererMesh',
      ]
    }],
    'no-console': 'off',
    'no-unused-vars': ["error", { "argsIgnorePattern": "^_" }],
    'no-mixed-operators': ['error', {
      groups: [
        ['&', '|', '^', '~', '<<', '>>', '>>>'],
        ['==', '!=', '===', '!==', '>', '>=', '<', '<='],
        ['&&', '||'],
        ['in', 'instanceof']
      ],
      allowSamePrecedence: true,
    }],
    'no-continue': 'off',
    'operator-linebreak': 'off',
  },
};
