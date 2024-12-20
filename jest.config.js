module.exports = {
    preset: 'ts-jest', // Ensures TypeScript compatibility
    testEnvironment: 'node',
    testMatch: [
      '**/?(*.)+(spec|test).[jt]s?(x)', // Matches files like videoController.test.ts
    ],
  };
  