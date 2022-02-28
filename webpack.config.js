module.exports = {
  module: {
    rules: [
      {
        test: /\.less$/i,
        loader: 'less-loader', // compiles Less to CSS
      },
    ],
  },
};