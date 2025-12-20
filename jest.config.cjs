module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['**/?(*.)+(test).ts?(x)'],
    transform: {
        '^.+test\\.ts?$': [
            'ts-jest',
            {
                tsconfig: 'tsconfig.test.json',
            },
        ],
    },
};
