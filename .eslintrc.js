module.exports = {
  root: true,
  env: {
    es2020: true,
    node: true,
    jest: true,
  },
  settings: {
    'import/resolver': {
      typescript: {},
      project: '.',
    },
  },
  extends: ['plugin:sonarjs/recommended', 'prettier', 'standard', 'airbnb-base', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: './',
  },
  plugins: ['@typescript-eslint', 'import', 'sonarjs', 'spellcheck'],
  rules: {
    'import/extensions': 'off',

    'import/prefer-default-export': 'off',

    // Desabilita obrigatoriedade de importar extensões, tipo
    // import { algumaCoisa } from 'myFile.ts'
    'import/extensions': 'off',

    'spellcheck/spell-checker': [
      'warn',
      {
        comments: false, // permitir comentários em outros idiomas
        strings: false, // permitir strings em outros idiomas
        templates: false, // permitir templates em outros idiomas
        identifiers: true, // NÃO permitir identificadores em outros idiomas
        lang: 'en_US',
        skipWords: ['youtube', 'href'], // permitir essas palavras
        minLength: 3, // minimo para analisar
      },
    ],
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    camelcase: 'off',
    'id-length': [2, { min: 3, properties: 'never', exceptions: ['key', 'id'] }],
    'no-magic-numbers': ['warn', { ignoreArrayIndexes: true, ignore: [0, 1] }],
    'no-alert': 'error',
    'no-delete-var': 'error',
    'no-const-assign': 'error',
    'no-unreachable': 'error',
    'max-lines': ['error', { max: 100, skipBlankLines: true, skipComments: true }],
    'max-depth': ['error', 3],
    'max-lines-per-function': ['error', { max: 100, skipBlankLines: true, skipComments: true }],
    'max-params': ['error', { max: 4 }],
    'no-console': 'off',
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    'no-underscore-dangle': 'off',
    'no-shadow': 'off',
    'class-methods-use-this': 'off',
    '@typescript-eslint/no-shadow': 'error',
    '@typescript-eslint/no-unused-vars': 'error',
    'no-unused-vars': 'error',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-dynamic-delete': 'error',
    '@typescript-eslint/no-redeclare': 'error',
    '@typescript-eslint/no-duplicate-enum-values': 'error',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'interface',
        format: ['PascalCase'],
        custom: {
          regex: '^[A-Za-z]',
          match: true,
        },
      },
      {
        selector: 'enum',
        format: ['PascalCase'],
        custom: {
          regex: 'Enum$',
          match: true,
        },
      },
    ],
  },
};
