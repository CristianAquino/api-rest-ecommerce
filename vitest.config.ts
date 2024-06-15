import { createVitestTestConfig } from './create-vitest-test-config';
import swc from 'unplugin-swc';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: createVitestTestConfig('(unit|e2e)'),
  plugins: [swc.vite()],
});
