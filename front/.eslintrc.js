module.exports = {
    env: {
        'browser': true,
        'jest': true,
        'es6': true,
        'node': true,
    },
    plugins: ['import'],
    extends: [
        'eslint:recommended',
        'plugin:react/recommended'
    ],
    parserOptions: {
        ecmaVersion: 2020,
        parser: '@babel/eslint-parser',
        sourceType: 'module',
    },
    rules: {
        indent: ['error', 4],
        'linebreak-style': ['error', 'unix'],
        quotes: ['error', 'single'],
        semi: ['error', 'never'],
        'no-async-promise-executor': 'off',
        'arrow-body-style': ['error', 'as-needed'],
        'comma-dangle': [
            'error',
            {
                arrays: 'never',
                objects: 'always-multiline',
                imports: 'never',
                exports: 'never',
                functions: 'never',
            }
        ],
        'react/prop-types': [0],
    },
}
