const path = require('path')

let ROOT = process.env.PWD

if (!ROOT) {
  ROOT = process.cwd()
}

module.exports = {
  app: 'Superlógica Starter',
  name: 'Superlógica',
  port: process.env.PORT || 8000,
  env: process.env.NODE_ENV,
  root: ROOT,
  paths: {
    src: path.resolve(__dirname, '..', 'src'),
    build: path.resolve(__dirname, '..', 'build'),
    static: path.resolve(__dirname, '..', 'public'),
  },
}
