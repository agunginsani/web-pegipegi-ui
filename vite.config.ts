import { defineConfig } from 'vitest/config';
import { resolve } from 'path';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

// TODO: sortout types

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    viteStaticCopy({
      targets: [
        { src: 'src/runtime/main.css', dest: '.' },
        { src: 'tailwind.config.cjs', dest: '.' },
      ],
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/lib.ts'),
      fileName: 'lib',
      name: 'WebPegipegiUI',
    },
    outDir: 'dist/lib',
    rollupOptions: {
      external: ['vue', '@vueuse/core'],
      output: {
        globals: {
          vue: 'Vue',
          '@vueuse/core': '@vueuse/core',
        },
      },
    },
  },
  test: {
    coverage: {
      all: true,
      exclude: [
        'src/test',
        '**/*.spec.{ts,tsx}',
        '**/*.stories.tsx',
        '**/*.d.ts',
      ],
      include: ['src'],
      reporter: ['lcov', 'text'],
    },
    environment: 'jsdom',
    globals: true,
    setupFiles: 'src/test/test-setup.ts',
  },
});
