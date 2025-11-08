import path from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import ReactCompiler from "babel-plugin-react-compiler";

// https://vitejs.dev/config
export default defineConfig((env) => {
  const { command } = env;
  return ({
    root: "./src",
    publicDir: "../public",
    build: {
      outDir: "../.vite/renderer",
      emptyOutDir: false,
      watch: command === "serve" ? {} : null,
      minify: command === "build",
      rollupOptions: {
        input: path.join(__dirname, "src/overlay.html"),
      },
    },
    plugins: [react({
      babel: {
        plugins: [ReactCompiler],
        targets: { electron: "39" }
      }
    }), tsconfigPaths()],
  });
});
