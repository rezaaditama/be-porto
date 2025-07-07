import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    ignores: [
      '**/dist/*',
      '**/node_modules/*',
      '**/public/*',
      'eslint.config.mjs',
      '**/tsconfig.json',
    ],
  },
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
    plugins: { '@typescript-eslint': tseslint.plugin, js },
    extends: ['js/recommended', ...tseslint.config.recommended],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: { project: ['./tsconfig.json'] },
      sourceType: 'module',
      globals: globals.node,
    },
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/strict-boolean-expressions': 'off',
      'no-return-assign': 'off',
      '@typescript-eslint/restrict-template-expressions': 'off',
      '@typescript-eslint/explicit-function-return-value': 'off',
      'array-callback-return': 'off',
    },
  },
]);
