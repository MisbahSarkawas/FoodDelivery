const config = require("./../commons/config");
const paths = require('./paths');
const isDev = process.env.NODE_ENV === 'development';
const isLocal = config.isLocal === 'Y';

module.exports = {
  isDev,
  isLocal,
  paths
};