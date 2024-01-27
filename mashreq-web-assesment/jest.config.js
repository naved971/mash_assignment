module.exports = {
    preset: 'ts-jest',
    transform: { '^.+\\.ts?$': 'ts-jest' },
    clearMocks: true,
    collectCoverage: true,
    coverageDirectory: "coverage",
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    testEnvironment: 'jsdom',
    moduleNameMapper: {

        // if your using tsconfig.paths thers is no harm in telling jest
        '@components/(.*)$': '<rootDir>/src/components/$1',
        '@/(.*)$': '<rootDir>/src/$1',
        "\\.(jpg|jpeg|png)$": "identity-obj-proxy",

    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    modulePaths: ['<rootDir>'],
};
