module.exports = {
  clearMocks: true,
  collectCoverage: false,
  collectCoverageFrom: ['src/**/*.tsx'],
  coverageDirectory: './coverage/',
  fakeTimers: {
    enableGlobally: true,
  },
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  moduleDirectories: ['node_modules', '<rootDir>/src'],
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': '<rootDir>/test/styleMock.js',
  },
  roots: ['<rootDir>/src'],
  setupFiles: ['<rootDir>/test/testEnv.ts'],
  testEnvironment: 'jest-environment-jsdom',
  testEnvironmentOptions: {
    url: 'http://localhost/',
  },
  testRegex: '\\.test\\.(jsx?|tsx?)$',
  transform: {
    '^.+\\.[jt]sx?$': '<rootDir>/test/transformTS.js',
    '^.+\\.(jpg)$': '<rootDir>/test/transformFile.js',
  },
  transformIgnorePatterns: ['node_modules/(?!@patternfly/react-icons/dist/esm)'],
};
