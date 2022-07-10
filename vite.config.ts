import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
  plugins: [solidPlugin()],
  build: {
    target: 'esnext',
    polyfillDynamicImport: false,
    outDir: 'docs'
  },
  base: '/Editor/',
  test: {
    globals: true,
    environment: 'jsdom',
    transformMode: {
      web: [/\.[jt]sx?$/],
    },
    deps: {
      inline: [
        /solid-js/,
        /solid-testing-library/,
      ],
    },
    coverage: {
      reporter: ['text', 'json', 'html'],
    },
  },
  resolve: {
    conditions: ['development', 'browser'],
  },
});
