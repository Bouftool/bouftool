import path from "node:path";
import babel from "@rolldown/plugin-babel";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

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
      rolldownOptions: {
        input: path.join(__dirname, "src/overlay.html"),
      },
    },
    plugins: [react(), babel({ presets: [reactCompilerPreset()] }), tsconfigPaths()],
  });
});
