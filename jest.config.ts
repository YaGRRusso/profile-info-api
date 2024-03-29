import type { Config } from 'jest'

export default {
  rootDir: '.',
  testRegex: '.*\\.spec\\.ts$',
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  transform: { '^.+\\.(t|j)s$': 'ts-jest' },
  collectCoverageFrom: ['**/*.service.(t|j)s', '**/*.controller.(t|j)s'],
  moduleFileExtensions: ['js', 'json', 'ts'],
  moduleNameMapper: {
    '@auth/(.*)': ['<rootDir>/src/auth/$1'],
    '@configs/(.*)': ['<rootDir>/src/common/configs/$1'],
    '@handlers/(.*)': ['<rootDir>/src/common/handlers/$1'],
    '@helpers/(.*)': ['<rootDir>/src/common/helpers/$1'],
    '@interfaces/(.*)': ['<rootDir>/src/common/interfaces/$1'],
    '@mappers/(.*)': ['<rootDir>/src/common/mappers/$1'],
    '@prisma/prisma(.*)': ['<rootDir>/src/common/prisma/prisma$1'],
    '@repositories/(.*)': ['<rootDir>/src/common/repositories/$1'],
    '@src/(.*)': ['<rootDir>/src/$1'],
  },
} satisfies Config
