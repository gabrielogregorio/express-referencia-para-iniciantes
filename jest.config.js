const { compilerOptions } = require('./tsconfig.json');
const { pathsToModuleNameMapper } = require('ts-jest');

module.exports = {
  clearMocks: true,
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>' }),
  preset: 'ts-jest',
  testEnvironment: 'node',
  testTimeout: 20000,
  globalSetup: '<rootDir>/global-setup.js',
  setupFilesAfterEnv: ['<rootDir>/setupFilesAfterEnv.js'],
};
