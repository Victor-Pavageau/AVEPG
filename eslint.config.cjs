const js = require('@eslint/js');
const reactHooks = require('eslint-plugin-react-hooks');
const reactRefresh = require('eslint-plugin-react-refresh');
const { defineConfig, globalIgnores } = require('eslint/config');
const globals = require('globals');
const tseslint = require('typescript-eslint');

module.exports = defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    plugins: {
      '@stylistic': require('@stylistic/eslint-plugin'),
      reactHooks,
      reactRefresh,
      tseslint,
    },
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.browser,
    },
    rules: {
      '@stylistic/indent': ['off', 2], // Disabled due to conflicts with Prettier
      '@stylistic/semi': ['error', 'always'],
      '@stylistic/quotes': ['error', 'single'],
      '@stylistic/jsx-quotes': ['error', 'prefer-single'],
      '@stylistic/no-trailing-spaces': 'error',
      '@stylistic/comma-dangle': ['error', {
        'arrays': 'always-multiline',
        'objects': 'always-multiline',
        'imports': 'always-multiline',
        'exports': 'always-multiline',
        'functions': 'always-multiline',
        'enums': 'always-multiline',
        'generics': 'always-multiline',
        'tuples': 'always-multiline',
      }],
      '@stylistic/no-multiple-empty-lines': ['error', { 'max': 1 }],
      'eqeqeq': 'error',
      'no-console': 'warn',
      'curly': 'error',
      'no-eval': 'error',
      'prefer-const': 'warn',
      'camelcase': 'error', // Currently frozen
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'react-hooks/exhaustive-deps': 'off',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/explicit-member-accessibility': 'error',
      '@typescript-eslint/explicit-module-boundary-types': 'error',
      '@typescript-eslint/typedef': ['error', {
        'arrayDestructuring': true,
        'arrowParameter': true,
        'memberVariableDeclaration': true,
        'objectDestructuring': true,
        'parameter': true,
        'propertyDeclaration': true,
        'variableDeclaration': true,
        'variableDeclarationIgnoreFunction': false,
      }],
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-inferrable-types': 'off', // Allow explicit types even if inferrable
      '@typescript-eslint/consistent-type-imports': 'error',
    },
  },
]);
