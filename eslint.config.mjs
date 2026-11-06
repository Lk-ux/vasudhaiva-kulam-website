import eslintPluginAstro from "eslint-plugin-astro";
import js from "@eslint/js";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";

export default defineConfig([
  // Astro linting
  ...eslintPluginAstro.configs.recommended,

  // TypeScript linting
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
    ],
  },
]);