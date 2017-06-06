var path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  devtool: "source-map",
  devServer: {
    contentBase: path.join(__dirname, "public")
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, "src"),
        loader: "babel-loader"
      }
    ]
  }
};
