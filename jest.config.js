module.exports = {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.js', '!src/**/stories/*'],
  coverageDirectory: './coverage/',
  fakeTimers: {
    enableGlobally: true,
  },
  moduleDirectories: [
    'node_modules',
    '<rootDir>/src', // the root directory
  ],
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy',
  },
  roots: ['<rootDir>/src/'],
  transformIgnorePatterns: ['/node_modules/(?!@redhat-cloud-services)', '/node_modules/(?!@patternfly)'],
  testEnvironment: 'jest-environment-jsdom',
  testRegex: '\\.test\\.(jsx?|tsx?)$',
  setupFilesAfterEnv: ['<rootDir>/config/jest.setup.js'],
};
