const sessions = require("express-session");
const MemoryStore = require("express-session").MemoryStore;
const config = require('./config');
const { isDev, isLocal } = require("./../utils");

const setupSession = server => {
    global.store = new MemoryStore();

    server.use(
        sessions({
            store: global.store,
            secret: config.sessionSecret,
            resave: false,
            saveUninitialized: true,
            cookie: {
                secure: !isDev && !isLocal, // if true only transmit cookie over https
                httpOnly: true, // if true prevent client side JS from reading the cookie
                maxAge: 1000 * 60 * 60 * 24 // session max age in miliseconds
            }
        })
    );
};

module.exports = setupSession;