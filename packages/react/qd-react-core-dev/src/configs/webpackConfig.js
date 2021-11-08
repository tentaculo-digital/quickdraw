import fs from "fs";
import path from "path";
import glob from "glob";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin"
import PurgecssPlugin from "purgecss-webpack-plugin";

const PATHS = {
  src: path.resolve(process.env.PWD, "dist")
}

const generateWebpack = (config = {}) => {
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
      static: "./dist",
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

export default generateWebpack