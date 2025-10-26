const js = require('@eslint/js');
const { defineConfig, globalIgnores } = require('eslint/config');
const globals = require('globals');

const reactHooks = require('eslint-plugin-react-hooks');
const reactRefresh = require('eslint-plugin-react-refresh');
const stylistic = require('@stylistic/eslint-plugin');
const tsPlugin = require('@typescript-eslint/eslint-plugin');
const tsParser = require('@typescript-eslint/parser');

module.exports = defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      '@stylistic': stylistic,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      '@typescript-eslint': tsPlugin,
    },
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      parser: tsParser,
      globals: {
        ...globals.browser,
        ...globals.es2022,
      },
    },
    extends: [
      js.configs.recommended,
    ],
    rules: {
      // === Stylistic rules ===
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
      // === Base rules ===
      'max-lines': ['error', { 'max': 200, 'skipBlankLines': true, 'skipComments': true }],
      'eqeqeq': 'error',
      'no-console': 'warn',
      'curly': 'error',
      'no-eval': 'error',
      'prefer-const': 'warn',
      'camelcase': 'error', // Currently frozen
      // === React / Hooks ===
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      // === TypeScript rules ===
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
        'variableDeclarationIgnoreFunction': true,
      }],
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-inferrable-types': 'off', // Allow explicit types even if inferrable
      '@typescript-eslint/consistent-type-imports': 'error',
    },
  },
]);
