const config = require("./commons/config");
const setupSession = require("./commons/sessionConfigurator");

require("./commons/dbConfigurator");

const CONTEXT_PATH = `/${config.contextPath}`;
const { server, setupRoutes, setupClient, createServer } = require("./server")

setupSession(server);
setupRoutes(CONTEXT_PATH);

setupClient();
createServer();

module.exports = server;