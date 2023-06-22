import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.js',
      name: 'components-dev-app-pausegarra-test-2',
      fileName: (format) => `index.${format}.js`
    },
  },
});
