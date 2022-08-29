import { defineConfig } from "vite";
import { resolve } from "path";
import { viteStaticCopy } from "vite-plugin-static-copy";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [
    vue(),
    viteStaticCopy({
      targets: [
        { src: "src/style.css", dest: "." },
        { src: "tailwind.config.cjs", dest: "." },
      ],
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "src/main.ts"),
      fileName: "main",
      name: "PegipegiWebUI",
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        globals: {
          vue: "Vue",
        },
      },
    },
  },
});
