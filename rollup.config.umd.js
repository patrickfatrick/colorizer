import base from './rollup.config.base'

export default Object.assign(base, {
  format: 'umd',
  moduleName: 'colorizer',
  dest: 'dist/colorizer.umd.js'
})
