import js from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import prettierConfig from "eslint-config-prettier";

const typescriptFiles = ["**/*.ts", "**/*.tsx", "**/*.mts", "**/*.cts"];
const typescriptRecommended = tseslint.configs["flat/recommended"].map((config) => ({
  ...config,
  files: config.files ?? typescriptFiles,
}));

export default [
  js.configs.recommended,
  ...typescriptRecommended,
  {
    files: typescriptFiles,
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "error",
    },
  },
  prettierConfig,
];
