module.exports = {
    root: true,
    extends: [
        '@react-native-community',
        'prettier',
        'plugin:@typescript-eslint/recommended',
        'prettier/@typescript-eslint',
        'plugin:prettier/recommended',
    ],
    overrides: [
        {
            files: ['*.ts', '*.tsx'],
            parser: '@typescript-eslint/parser',
            rules: {
                '@typescript-eslint/explicit-function-return-type': 'off',
                '@typescript-eslint/explicit-function-return-type': [
                    'error',
                    {
                        allowExpressions: true,
                    },
                ],
                '@typescript-eslint/no-use-before-define': ['error', { variables: false }],
            },
        },
    ],
};
