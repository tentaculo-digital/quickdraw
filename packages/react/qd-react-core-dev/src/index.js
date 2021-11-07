import eslintConfig from "./configs/eslintConfig.js";
import prettierConfig from "./configs/prettierConfig.js";
import createBundle from "./configs/webpackConfig.js";

export default {
  generateWebpack: createBundle,
  generatePrettier: prettierConfig,
  generateEslint: eslintConfig
}