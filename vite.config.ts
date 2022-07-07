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
  },
  resolve: {
    conditions: ['development', 'browser'],
  },
});
