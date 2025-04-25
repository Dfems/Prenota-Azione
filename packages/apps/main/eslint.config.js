import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

const commonRules = {
  ...prettierConfig.rules,
  'prettier/prettier': 'error',
  '@typescript-eslint/no-explicit-any': 'warn',
  '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
};

export default [
  // Ignora build/generated
  { ignores: ['**/dist/**', '**/generated/**'] },

  // Unico override per tutti i .ts/.tsx del monorepo
  {
    files: ['packages/**/*.{ts,tsx}'],

    plugins: {
      '@typescript-eslint': tsPlugin,
      prettier: prettierPlugin,
    },

    languageOptions: {
      parser: tsParser,
      parserOptions: {
        // elenca qui tutti i tsconfig.json dei tuoi package
        project: [
          'packages/apps/backend/tsconfig.json',
          'packages/apps/main/tsconfig.json',
          'packages/apps/register/tsconfig.json',
          'packages/apps/orders/tsconfig.json',
          'packages/components/tsconfig.json',
          'packages/shared/tsconfig.json',
        ],
        tsconfigRootDir: new URL('.', import.meta.url),
      },
    },

    rules: commonRules,
  },
];
