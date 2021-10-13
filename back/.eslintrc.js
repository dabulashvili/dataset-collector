module.exports = {
    env: {
        commonjs: true,
        es2021: true,
        node: true,
    },
    extends: 'eslint:recommended',
    parserOptions: {
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
    },
}
