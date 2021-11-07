import path from "path"

const PATHS = {
  src: path.resolve(process.env.PWD, "dist")
}

const createBundle = (config = {}) => {
  return {
    mode: "development",
    entry: {
      index: "./src/index.js",
    },
    resolve: {
      alias: {
        "react/jsx-dev-runtime": "react/jsx-dev-runtime.js",
        "react/jsx-runtime": "react/jsx-runtime.js",
      },
    },
    module: {
      rules: [
        {
          test: /\.js?$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          },
        },
        {
          test: /\.scss$/,
          include: /.scss$/,
          use: [
            MiniCssExtractPlugin.loader,
            "css-loader",
            "postcss-loader",
            { loader: "sass-loader", options: { sourceMap: true } },
          ],
        },
      ],
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          styles: {
            name: "styles",
            test: /\.css$/,
            chunks: "all",
            enforce: true,
          },
        },
      },
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./.devServer/index.html",
      }),

      new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: "[id].css",
      }),

      new PurgecssPlugin({
        paths: glob.sync(`${PATHS.src}/**/*`, { nodir: true }),
      }),
    ],
    devServer: {
      contentBase: "./dist",
      host: "0.0.0.0",
      port: 9000,
      https: {
        key: fs.readFileSync(".certs/key.pem"),
        cert: fs.readFileSync(".certs/cert.pem"),
      },
      hot: true,
      historyApiFallback: true,
    },
    output: {
      filename: "[name].bundle.js",
      path: `${PATHS.src}`,
      // clean: true,
      publicPath: "/",
    },
    ...config
  };
};

export default createBundle