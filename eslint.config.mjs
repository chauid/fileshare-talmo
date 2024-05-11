import typescript_parser from '@typescript-eslint/parser';
import typescript_eslint from '@typescript-eslint/eslint-plugin';
import eslint_react from 'eslint-plugin-react';
import eslint_plugin_import from 'eslint-plugin-import';

export default [
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: typescript_parser,
    },
    plugins: {
      typescript_eslint,
      eslint_react,
      eslint_plugin_import,
    },
    ignores: ['.next/**/*.ts', '.next/**/*.tsx'],
    rules: {
      camelcase: 'off',
      'no-console': ['error', { allow: ['assert'] }],
      'no-alert': 'off',
      'linebreak-style': 'off',
      'no-underscore-dangle': 'off',
      'dot-notation': 'off',
      'max-len': ['warn', { code: 150, ignoreComments: true }],
      indent: ['warn', 2],
      'no-plusplus': 'off',
      'object-curly-newline': ['error', { multiline: true }],
      'no-extra-semi': 'warn',
      'no-multi-spaces': 'warn',
      'key-spacing': 'warn',
      'no-use-before-define': [
        'error',
        {
          functions: true,
          classes: true,
          variables: true,
          allowNamedExports: true,
        },
      ],
      'sort-imports': [
        'error',
        {
          ignoreCase: true,
          ignoreDeclarationSort: true,
          ignoreMemberSort: false,
          memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
          allowSeparatedGroups: true,
        },
      ],
      'typescript_eslint/no-explicit-any': 'off',
      'typescript_eslint/no-unused-vars': 'warn',
      'eslint_react/no-unknown-property': ['warn', { ignore: ['jsx'] }],
      'eslint_plugin_import/no-unresolved': 'off',
      'eslint_plugin_import/extensions': [
        'error',
        'ignorePackages',
        {
          js: 'never',
          jsx: 'never',
          ts: 'never',
          tsx: 'never',
        },
      ],
      'eslint_plugin_import/order': [
        'warn',
        {
          groups: ['builtin', 'external', ['parent', 'sibling'], 'index', 'object', 'type'],
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
          'newlines-between': 'always',
        },
      ],
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
];
