module.exports = {
  env: {
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:sonarjs/recommended',
    'plugin:jest/recommended',
    'prettier'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint', 'sonarjs', 'jest'],
  rules: {
    indent: ['error', 2, { SwitchCase: 1 }],
    'jest/no-disabled-tests': 'warn',
    'jest/no-focused-tests': 'error',
    'jest/no-identical-title': 'error',
    'jest/prefer-to-have-length': 'warn',
    'jest/valid-expect': 'error',
    'sonarjs/cognitive-complexity': ['error', 16],
    'sonarjs/no-identical-expressions': 'error',
    'sonarjs/no-duplicate-string': 0,
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'interface',
        format: ['PascalCase']
      },
      {
        selector: ['variable', 'function'],
        format: ['camelCase', 'UPPER_CASE'],
        leadingUnderscore: 'allow'
      }
    ]
  }
};
