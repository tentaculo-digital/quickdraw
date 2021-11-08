import generateBabel from "./configs/babelConfig.js";
import generateEslint from "./configs/eslintConfig.js";
import generatePrettier from "./configs/prettierConfig.js";
import generateWebpack from "./configs/webpackConfig.js";

export default {
  generateBabel: generateBabel,
  generateEslint: generateEslint,
  generatePrettier: generatePrettier,
  generateWebpack: generateWebpack,
};
