const path = require('path');
const root = path.resolve(process.cwd());

module.exports = {
  assets: `${root}/src/assets`,
  client: `${root}/src/client`,
  config: `${root}/src/server/config`,
  logs: `${root}/logs`,
  public: `${root}/public`,
  server: `${root}/src/server`,
  storage: `${root}/storage`,
  utils: `${root}/src/server/utils`
};