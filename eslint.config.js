import js from '@eslint/js';
import importPlugin from 'eslint-plugin-import';
import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';
import svelte from 'eslint-plugin-svelte';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default [
  {
    ignores: [
      '.svelte-kit/**',
      'build/**',
      'node_modules/**',
      'package-lock.json',
      'vite.config.ts.timestamp-*',
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...svelte.configs['flat/recommended'],
  prettierConfig,
  ...svelte.configs['flat/prettier'],
  {
    files: ['**/*.ts', '**/*.svelte.ts'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        sourceType: 'module',
      },
    },
  },
  {
    files: ['**/*.{js,ts,svelte}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      import: importPlugin,
      prettier: prettierPlugin,
    },
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js', '.ts', '.svelte'],
          moduleDirectory: ['src', 'node_modules'],
        },
        typescript: {},
      },
    },
    rules: {
      curly: ['error', 'all'],
      eqeqeq: ['error', 'always'],
      'no-console': 'off',
      'no-debugger': 'error',
      quotes: ['error', 'single', { avoidEscape: true }],
      'object-curly-spacing': ['error', 'always'],
      'arrow-body-style': ['error', 'as-needed'],
      semi: ['error', 'always'],
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          'newlines-between': 'never',
        },
      ],
      'import/no-extraneous-dependencies': 'off',
      'import/extensions': 'off',
      'prettier/prettier': 'error',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
  },
  {
    files: ['**/*.svelte'],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
      },
    },
    rules: {
      'svelte/no-at-html-tags': 'error',
    },
  },
];
