module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ["**/__tests__/**/*.ts?(x)", "**/?(*.)+(test).ts?(x)"],
    globals: {
        'ts-jest': {
            tsconfig: 'tsconfig.json'
        }
    }
}