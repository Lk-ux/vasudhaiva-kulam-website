import js from "@eslint/js";
import eslintPluginAstro from "eslint-plugin-astro";

export default [
  {
    ...js.configs.recommended,
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      ...js.configs.recommended.languageOptions,
      globals: {
        console: "readonly",
        process: "readonly",
      },
    },
  },
  ...eslintPluginAstro.configs.recommended,
];
