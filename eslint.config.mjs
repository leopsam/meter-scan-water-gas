import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import prettier from 'eslint-plugin-prettier';
import parser from '@typescript-eslint/parser';

/** @type {import('eslint').Linter.FlatConfig} */
const config = [
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    languageOptions: {
      globals: globals.browser,
    },
    plugins: {
      '@typescript-eslint': tseslint,
      prettier: prettier,
    },
    parser: parser,
    rules: {
      'prettier/prettier': 'error',
      '@typescript-eslint/no-var-requires': 'off',
      camelcase: 'off',
    },
  },
  {
    files: ['**/*.ts'],
    rules: {
      ...tseslint.configs.recommended.rules,
    },
  },
  {
    files: ['**/*.js'],
    rules: {
      ...pluginJs.configs.recommended.rules,
    },
  },
];

export default config;
