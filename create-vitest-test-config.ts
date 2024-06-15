import { InlineConfig } from 'vitest';

export const createVitestTestConfig = (testingType: string): InlineConfig => {
  return {
    root: './',
    globals: true,
    isolate: false,
    passWithNoTests: true,
    include: [`tests/${testingType}/**/*.test.ts`],
    env: { [process.env.test]: process.cwd() ?? '' },
    coverage: {
      provider: 'istanbul',
      reporter: ['text', 'json', 'html'],
      reportsDirectory: `coverage/${testingType}`,
      include: ['src/**/*.ts'],
    },
  };
};
