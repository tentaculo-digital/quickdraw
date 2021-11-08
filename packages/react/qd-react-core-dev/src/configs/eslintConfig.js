const generateEslint = () => {
  return {
    env: {
      browser: true,
      es2021: true,
    },
    extends: [
      "plugin:react/recommended",
      "plugin:jsdoc/recommended",
      "airbnb",
      "prettier",
    ],
    parser: "babel-eslint",
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
      ecmaVersion: 12,
      sourceType: "module",
    },
    plugins: ["jsdoc", "prettier", "react"],
    rules: {
      "prettier/prettier": "error",
      "react/jsx-filename-extension": ["warn", { extensions: [".js"] }],
      "import/prefer-default-export": "off",
      "jsx-quotes": ["error", "prefer-double"],
      "react/react-in-jsx-scope": "off",
      "import/extensions": [0, { "<js>": "always" }],
      "jsdoc/require-jsdoc": [
        2,
        {
          require: {
            FunctionDeclaration: true,
            MethodDefinition: true,
            ClassDeclaration: true,
            ArrowFunctionExpression: true,
            FunctionExpression: true,
          },
        },
      ],
    },
  };
};

export default generateEslint;
