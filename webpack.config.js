const path = require("path");

module.exports = {
  entry: "./src/index-dev.js",
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "resume_builder_bundle.js"
  },
  devServer: {
    watchContentBase: true,
    publicPath: "/dist/",
    historyApiFallback: {
      rewrites: [
        { from: /^\/$/, to: "/View-dev.html" },
        { from: /^\/subpage/, to: "/views/subpage.html" },
        { from: /./, to: "/views/404.html" }
      ]
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: ["css-loader"]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {}
          }
        ]
      }
    ]
  }
};
