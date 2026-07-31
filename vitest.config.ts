import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      src: new URL("./src", import.meta.url).pathname,
    },
  },
  test: {
    environment: "node",
    isolate: false,
    coverage: {
      provider: "v8",
      reporter: ["text"],
      thresholds: {
        perFile: true,
        statements: 100,
        branches: 100,
        functions: 100,
        lines: 100,
      },
      include: ["src/wakfu/equipment/{catalog,comparison,integer,legality,evaluator,enumerator,rules}.ts"],
    },
  },
});
