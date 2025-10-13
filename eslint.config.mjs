// eslint.config.mjs
import { defineConfig } from 'eslint/config';
import globals from 'globals';

export default defineConfig({
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'prettier'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  globals: {
    ...globals.browser,
    process: 'readonly',
  },
  rules: {
    'no-unused-vars': 'error',
    'no-unused-expressions': 'error',
    'prefer-const': 'error',
    'no-console': 'off',
    eqeqeq: 'error',
    curly: 'error',
    semi: ['error', 'always'],
    quotes: ['error', 'double'],
    'prettier/prettier': 'error',
  },
});
