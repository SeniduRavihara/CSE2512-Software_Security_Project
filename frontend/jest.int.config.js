const baseConfig = require('./jest.config');

/** @type {import("jest").Config} **/
module.exports = {
  ...baseConfig,
  testMatch: ['**/*.int.test.ts'],
  setupFilesAfterEnv: ['<rootDir>/__tests__/integration/setup.ts'],
};
