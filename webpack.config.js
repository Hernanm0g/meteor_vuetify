var path = require('path')
var webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const meteorExternals = require('webpack-meteor-externals');
const nodeExternals = require('webpack-node-externals');
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const clientConfig = {
  entry: [
    "core-js/modules/es.promise",
    "core-js/modules/es.array.iterator",
    "./client/main.js"
  ],
  output: {
    publicPath: '/',
    filename: 'build.js'
  },
  optimization: {
    minimize: false
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ],
      },
      {
        test: /\.sass$/,
        use: [
          'vue-style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                indentedSyntax: true
              }
            }
          }
        ]
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {}
          // other vue-loader options go here
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  resolve: {
    modules: [
      path.resolve(__dirname, 'node_modules'),
      path.resolve(__dirname, './'), // enables you to use 'imports/...' instead of '/imports/...'
    ],
    alias: {
      '/imports': path.resolve(__dirname, './imports'),
      // ... and any other directories you might have
    }
  },
  // resolve: {
  //   alias: {
  //     'vue$': 'vue/dist/vue.esm.js'
  //   },
  //   extensions: ['*', '.js', '.vue', '.json']
  // },
  externals: [meteorExternals()],
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true,
    hot: true
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new VueLoaderPlugin(),
    new VuetifyLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: './client/main.html'
    })
  ]
}

const serverConfig = {
  entry: [
    "./server/main.js"
  ],
  target: 'node',
  externals: [
    meteorExternals(),
    nodeExternals()
  ],
  resolve: {
    modules: [
      path.resolve(__dirname, 'node_modules'),
      path.resolve(__dirname, './'), // enables you to use 'imports/...' instead of '/imports/...'
    ],
    alias: {
      '/imports': path.resolve(__dirname, './imports'),
      // ... and any other directories you might have
    }
  },
  devServer: {
    hot: true
  },
  plugins: [
    new webpack.DefinePlugin({ "global.GENTLY": false })
  ]
};

module.exports = [clientConfig, serverConfig]