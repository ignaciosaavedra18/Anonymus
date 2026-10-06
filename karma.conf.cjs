module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      'src/tests/**/*.spec.jsx'
    ],
    preprocessors: {
      'src/tests/**/*.spec.jsx': ['webpack']
    },
    webpack: {
      mode: 'development',
      module: {
        rules: [
          {
            test: /\\.jsx?$/,
            exclude: /node_modules/,
            use: 'babel-loader'
          }
        ]
      },
      resolve: {
        extensions: ['.js', '.jsx']
      }
    },
    reporters: ['progress', 'coverage'],
    coverageReporter: {
      dir: 'coverage/',
      reporters: [
        { type: 'text-summary' },
        { type: 'html' },
        { type: 'lcovonly' }
      ]
    },
    browsers: ['ChromeHeadless'],
    singleRun: true,
    autoWatch: false,
    client: {
      jasmine: {
        random: false
      }
    },
    restartOnFileChange: false
  })
}
