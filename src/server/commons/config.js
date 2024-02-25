require("dotenv").config();

const config = {
  appname: process.env.APP_NAME,
  db: {
    DB_URI: process.env.DB_URI,
  },
  server: {
    PORT: process.env.PORT,
    PORT_SSL: process.env.PORT_SSL,
    APP_TLS_KEY: process.env.APP_TLS_KEY,
    APP_TLS_CRT: process.env.APP_TLS_CRT,
    ROOT_CA_CRT: process.env.ROOT_CA_CRT,
    MTLS: process.env.MTLS
  },
  nodeEnv: process.env.NODE_ENV,
  contextPath: process.env.CONTEXT_PATH,
  clientContextPath: process.env.CLIENT_CONTEXT_PATH,
  isLocal: process.env.IS_LOCAL,
  sessionSecret: process.env.SESSION_SECRET,
  contentSecurityPolicy: process.env.CONTENT_SECURITY_POLICY,
};

module.exports = config;
