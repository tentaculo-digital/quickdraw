const generateBabel = () => {
  return {
    presets: [
      "@babel/preset-env",
      [
        "@babel/preset-react",
        {
          runtime: "automatic",
        },
      ],
    ],
  };
};

export default generateBabel;
