module.exports = {
  plugins: [
    //Polyfill needed nodejs plugins for Arweave-js
    new webpack.ProvidePlugin({
      process: "process/browser",
    }),
    new webpack.ProvidePlugin({
      util: "util/",
    }),
  ],
};
