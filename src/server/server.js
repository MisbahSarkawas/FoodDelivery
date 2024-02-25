const express = require("express");
const server = express();
const cookieParser = require("cookie-parser");
const compression = require("compression");
const helmet = require("helmet");
const hpp = require("hpp");
const http = require("http");
const https = require("https");
const config = require("./commons/config");
const { isDev, isLocal, paths } = require("./utils");
const { setupUserSchemaAndModel } = require('./modules/user/schema/UserSchema');

server.use(helmet());
server.use(cookieParser());
server.use(compression());
server.use(express.json({ limit: "64mb" }));
server.use(express.urlencoded({
    extended: true
}), hpp());

server.disable("x-powered-by");

server.use(function (req, res, next) {
    res.setHeader(
        'Content-Security-Policy',
        (
            config.contentSecurityPolicy ||
            `default-src 'self'; font-src 'self'; img-src 'self';` +
            `script-src 'self'; style-src 'self' 'unsafe-inline';` +
            `frame-src 'self'`
        )
    );
   
    next();
});

const setupSchema = () => {
    setupUserSchemaAndModel();
} 

const setupRoutes = contextPath => {
    server.use(`${contextPath}/status`, (req, res) => {
        res.send({
          STATUS: "UP",
          version: require("../../package.json").version
        })
    });
   
    server.use(`${contextPath}/users`, require("./modules/user/router/UserRouter"))
    /* ;
    server.use(`/rest/v1/slugs`, require("./modules/slug/router/SlugRouter"));
    server.use(`/rest/v1/realms`, require("./modules/realm/router/RealmRouter"));
    server.use(`/rest/v1/auth/layout`, require("./modules/layout/router/LayoutRouter")); */
}

const setupClient = () => {
    // serve files in production environment
    if (!isDev && !isLocal) {
        server.use(`/${config.clientContextPath}`, express.static(`${paths.public}/${config.clientContextPath}`));
        server.get("*", (req, res) => {
            res.sendFile(`${paths.public}/index.html`);
        });
    }

    server.use(require("./middleware/notFoundHandler"));
}

const createServer = () => {
    http.createServer({}, server).listen(config.server.PORT,() => {
        console.log('http server started');
    });
     
    if ( !isLocal && config.server.PORT_SSL ) {
        https
            .createServer({
                key: config.server.APP_TLS_KEY,
                cert: config.server.APP_TLS_CRT,
                requestCert: config.server.MTLS === "true",
                rejectUnauthorized: config.server.MTLS === "true"
            }, server)
            .listen(config.server.PORT_SSL, () => {
                console.log('https server started');
            });
    }
}

module.exports = {
    server,
    setupRoutes,
    setupSchema,
    setupClient,
    createServer
}