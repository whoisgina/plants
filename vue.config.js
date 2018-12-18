const path = require('path')

module.exports = {
  configureWebpack: {
    module: {
      rules: [{
        test: /\.scss$/,
        use: ['sass-loader', {
          loader: 'style-resources-loader',
          options: {
            patterns: [
              path.resolve(__dirname, 'src/assets/stylesheets/**/*.scss')
            ]
          }
        }]
      },
      {
        test: /\.(woff|ttf|eot|svg)(\?v=[a-z0-9]\.[a-z0-9]\.[a-z0-9])?$/,
        loader: 'url-loader?limit=100000',
        options: {
          patterns: [
            path.resolve(__dirname, 'src/assets/fonts/[name].[hash:7].[ext]')
          ]
        }
      }]
    }
  }
}
