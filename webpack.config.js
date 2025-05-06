const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CopyPlugin = require("copy-webpack-plugin")

module.exports = (env, argv) => {
  const isProduction = argv.mode === "production"

  return {
    entry: "./src/index.jsx",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "js/[name].[contenthash:8].js",
      publicPath: "/",
      clean: true,
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", ["@babel/preset-react", { runtime: "automatic" }]],
            },
          },
        },
        {
          test: /\.css$/,
          use: [isProduction ? MiniCssExtractPlugin.loader : "style-loader", "css-loader"],
        },
        {
          test: /\.(png|jpg|jpeg|gif|svg)$/,
          type: "asset",
          parser: {
            dataUrlCondition: {
              maxSize: 10 * 1024, // 10kb
            },
          },
          generator: {
            filename: "images/[name].[hash:8][ext]",
          },
        },
      ],
    },
    resolve: {
      extensions: [".js", ".jsx"],
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./public/index.html",
      }),
      isProduction &&
        new MiniCssExtractPlugin({
          filename: "css/[name].[contenthash:8].css",
        }),
      new CopyPlugin({
        patterns: [
          {
            from: "public",
            to: "",
            globOptions: {
              ignore: ["**/index.html", "**/favicon.ico"],
            },
          },
        ],
      }),
    ].filter(Boolean),
    devServer: {
      static: {
        directory: path.join(__dirname, "public"),
      },
      port: 3000,
      hot: true,
      historyApiFallback: true,
      open: true,
    },
    devtool: isProduction ? "source-map" : "eval-source-map",
    performance: {
      hints: isProduction ? "warning" : false,
    },
    optimization: {
      splitChunks: {
        chunks: "all",
      },
    },
  }
}
