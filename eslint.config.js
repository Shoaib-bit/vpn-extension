import pluginJs from "@eslint/js";
import ts from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import eslintConfigPrettier from "eslint-config-prettier";
import pluginImport from "eslint-plugin-import";
import pluginReact from "eslint-plugin-react";
import globals from "globals";
import tseslint from "typescript-eslint";

export default [
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  eslintConfigPrettier,
  {
    plugins: {
      import: pluginImport,
      "@typescript-eslint": ts,
    },
    rules: {
      "react/react-in-jsx-scope": "off",
      'import/newline-after-import': [
      'warn',
      {
        count: 1
      }
    ],
    'import/order': [
      'warn',
      {
        groups: ['builtin', 'external', ['internal', 'parent', 'sibling', 'index'], ['object', 'unknown']],
        pathGroups: [
          {
            pattern: 'react',
            group: 'external',
            position: 'before'
          },
          {
            pattern: '~/**',
            group: 'external',
            position: 'before'
          },
          {
            pattern: '@/**',
            group: 'internal'
          }
        ],
        pathGroupsExcludedImportTypes: ['react', 'type'],
        'newlines-between': 'never'
      }
    ],
      "@typescript-eslint/no-explicit-any": "error",
    },
    settings: {
      "import/resolver": {
        typescript: true,
        node: true,
      },
    },
    languageOptions: {
      parser: tsParser,
    },
  },
];
