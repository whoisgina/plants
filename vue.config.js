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
      }]
    }
  }
}
