module.exports = {
    root: true,
    env: {
        browser: true,
        es2021: true,
    },
    extends: ['airbnb-base', 'airbnb-typescript/base', 'prettier'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        tsconfigRootDir: './', // 追加 tsconfig.jsonがある相対パスを指定
        project: ['./tsconfig.json'],
    },
    plugins: ['@typescript-eslint'],
    rules: {},
};