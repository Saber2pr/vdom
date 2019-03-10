import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'

const dev = {
  input: './lib/test/test.js',
  output: {
    file: 'build/bundle.js',
    format: 'iife',
    name: 'svdom'
  },
  watch: {
    include: 'lib/**'
  },
  plugins: [resolve(), commonjs()]
}

const pro = {
  input: './lib/index.js',
  output: {
    file: 'build/bundle.js',
    format: 'iife',
    name: 'svdom'
  },
  watch: {
    include: 'lib/**'
  },
  plugins: [resolve(), commonjs()]
}

export default pro