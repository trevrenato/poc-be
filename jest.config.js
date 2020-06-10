module.exports = {
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  coverageThreshold: {
    global: {
      statements: 80,
      branches: 80,
      functions: 80,
      lines: 80,
    },
  },
  moduleNameMapper: {
    '@clients': ['<rootDir>/src/clients'],
    '@controllers': ['<rootDir>/src/controllers'],
    '@entities': ['<rootDir>/src/entities'],
    '@models': ['<rootDir>/src/models'],
    '@repositories': ['<rootDir>/src/repositories'],
    '@routes': ['<rootDir>/src/routes'],
    '@use-cases': ['<rootDir>/src/use-cases'],
  },
  moduleDirectories: ['node_modules', 'src'],
  globals: {
    'ts-jest': {
      tsConfig: '<rootDir>/tsconfig.spec.json',
    },
  },
};
