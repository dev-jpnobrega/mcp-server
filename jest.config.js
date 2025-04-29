/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  testEnvironment: "node",
  transform: {
    "^.+\.tsx?$": ["ts-jest",{}],
  },
  collectCoverageFrom: ['<rootDir>/src/**/*.{ts,tsx}'],
  coveragePathIgnorePatterns: [
    "<rootDir>/src/infrastructure/",
    "<rootDir>/src/settings/",
    "<rootDir>/src/index.ts",
    "<rootDir>/src/domain/commands/base.command.ts",
    "<rootDir>/build/",
    "<rootDir>/tests/"
  ],
  moduleNameMapper: {
    "^(\\.\\.?\\/.+)\\.js$": "$1",
  },
  testMatch: ['**/*.spec.ts']
};