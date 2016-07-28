var dest = './dist'
var src = '.'

module.exports = {
  build: {
    transform: ['babelify', {
      compact: false
    }],
    config: './config.js',
    src: src + '/index.js',
    dest: dest + '/',
    outputName: 'colorizer.js',
    standalone: 'colorizer',
    extensions: ['js']
  },
  min: {
    transform: ['babelify', {
      compact: true
    }],
    config: './config.js',
    src: src + '/index.js',
    dest: dest + '/',
    outputName: 'colorizer.min.js',
    standalone: 'colorizer',
    extensions: ['js', 'es6']
  },
  lint: {
    src: src + '/index.js'
  }
}
