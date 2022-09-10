import { defineConfig } from 'vitest/config';
import { resolve } from 'path';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [
    vue(),
    viteStaticCopy({
      targets: [
        { src: 'src/style.css', dest: '.' },
        { src: 'tailwind.config.cjs', dest: '.' },
      ],
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/main.ts'),
      fileName: 'main',
      name: 'PegipegiWebUI',
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
  test: {
    coverage: {
      all: true,
      exclude: ['src/test', '**/*.spec.ts', '**/*.stories.tsx', '**/*.d.ts'],
      include: ['src'],
      reporter: ['lcov', 'text'],
    },
    environment: 'jsdom',
    globals: true,
    setupFiles: 'src/test/test-setup.ts',
  },
});
