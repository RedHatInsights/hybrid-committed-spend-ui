const transformIgnorePatterns = [
  'node_modules/(?!(@patternfly/react-core/src|@patternfly/react-icons/dist/esm|uuid/dist/esm-browser|react-intl|@formatjs/.*|intl-messageformat))',
];

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  clearMocks: true,
  collectCoverage: false,
  // collectCoverageFrom: ['src/**/*.js'],
  // coverageDirectory: './coverage/',
  fakeTimers: {
    enableGlobally: true,
  },
  moduleDirectories: ['node_modules', '<rootDir>/src'],
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy',
  },
  preset: 'ts-jest',
  roots: ['<rootDir>/src/'],
  setupFiles: ['<rootDir>/test/testEnv.ts'],
  setupFilesAfterEnv: ['<rootDir>/test/jest.setup.js'],
  testEnvironment: 'jsdom',
  transformIgnorePatterns,
  transform: {
    '^.+\\.svg$': 'jest-transform-stub',
    '^.+\\.[tj]sx?$': 'ts-jest',
  },
};
