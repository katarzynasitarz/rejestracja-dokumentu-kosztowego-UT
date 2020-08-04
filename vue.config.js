const ZipPlugin = require("zip-webpack-plugin");
const configureAPI = require("./src/server/configure");

module.exports = {
  devServer: {
    before: configureAPI,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers":
        "Origin, X-Requested-With, Content-Type, Accept",
    },
    compress: true,
    historyApiFallback: false,
  },
  transpileDependencies: ["vuetify"],
  filenameHashing: true,
  css: {
    extract: {
      filename: "css/[name].css",
      chunkFilename: "css/[name].css",
    },
  },
  configureWebpack: {
    output: {
      filename: "js/[name].js",
    },
    plugins: [
      new ZipPlugin({
        // OPTIONAL: defaults to the Webpack output path (above)
        // can be relative (to Webpack output path) or absolute
        path: "zip",

        // OPTIONAL: defaults to the Webpack output filename (above) or,
        // if not present, the basename of the path
        filename: "academy-2020-frontend.zip",

        // OPTIONAL: defaults to the empty string
        // the prefix for the files included in the zip file
        //opathPrefix: 'relative/path',

        // OPTIONAL: defaults to including everything
        // can be a string, a RegExp, or an array of strings and RegExps
        include: [
          /\.js$/,
          /\.css$/,
          /\.map$/,
          /\.eot$/,
          /\.ttf$/,
          /\.woff$/,
          /\.woff2$/,
          /^COMMITHASH$/,
          /^VERSION$/,
        ],

        // OPTIONAL: defaults to excluding nothing
        // can be a string, a RegExp, or an array of strings and RegExps
        // if a file matches both include and exclude, exclude takes precedence
        exclude: [/\.png$/, /\.html$/],

        // yazl Options

        // OPTIONAL: see https://github.com/thejoshwolfe/yazl#addfilerealpath-metadatapath-options
        fileOptions: {
          mtime: new Date(),
          mode: 0o100664,
          compress: false,
          forceZip64Format: false,
        },

        // OPTIONAL: see https://github.com/thejoshwolfe/yazl#endoptions-finalsizecallback
        zipOptions: {
          forceZip64Format: false,
        },
      }),
    ],
    optimization: {
      splitChunks: {
        chunks: "async",
        minSize: 30000,
        maxSize: 0,
        minChunks: 1,
        maxAsyncRequests: 6,
        maxInitialRequests: 4,
        automaticNameDelimiter: "~",
        automaticNameMaxLength: 30,
        cacheGroups: {
          defaultVendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
          vendors: {
            filename: "js/chunk-vendors.js",
          },
          common: {
            filename: "js/chunk-common.js",
          },
        },
      },
    },
  },
};
