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
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          patterns: [
            path.resolve(__dirname, 'src/assets/fonts/[name].[hash:7].[ext]')
          ]
        }
      }]
    }
  }
}
