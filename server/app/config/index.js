/* eslint no-process-env: "off"*/
const pkg = require("../../package.json");
require("dotenv").config();
const logFolder = process.env.LOG_FOLDER || "./public/logs";

const config = {
  level: process.env.LOG_LEVEL || "debug",
  logger: {
    console: {
      enable: true,
      level: process.env.LOG_LEVEL || "debug",
    },
    defaultLevel: "debug",
    file: {
      compress: false,
      app: `${logFolder}/app.log`,
      error: `${logFolder}/error.log`,
      access: `${logFolder}/access.log`,
      format: ".yyyy-MM-dd",
    },
    appenders: ["CONSOLE", "FILE", "ERROR_ONLY"],
  },
  app: {
    name: process.env.APP_NAME || "Backend API",
    version: pkg.version,
    buildNumber: process.env.BUILD_NUMBER || process.env.CI_JOB_ID || "",
    description: pkg.description,
    port: parseInt(process.env.PORT || process.env.APP_PORT),
  },
  db: {
    postgres: {
      read: [
        {
          database: process.env.POSTGRES_READ_DB_NAME,
          username: process.env.POSTGRES_READ_DB_USER,
          password: process.env.POSTGRES_READ_DB_PASS,
          host: process.env.POSTGRES_READ_DB_HOST,
          port: process.env.POSTGRES_READ_DB_PORT,
        },
      ],
      write: {
        database: process.env.POSTGRES_WRITE_DB_NAME,
        username: process.env.POSTGRES_WRITE_DB_USER,
        password: process.env.POSTGRES_WRITE_DB_PASS,
        host: process.env.POSTGRES_WRITE_DB_HOST,
        port: process.env.POSTGRES_WRITE_DB_PORT,
      },
      options: {
        dialect: "postgres",
        logging: false,
        pool: {
          max: 50,
          idle: 30000,
        },
        dialectOptions: {
          ssl: process.env.POSTGRES_SSL_MODE === "true",
        },
      },
    },
  },
  rateLimit: process.env.RATE_LIMIT ? parseInt(process.env.RATE_LIMIT) : 100,
  token: {
    key: {
      private: process.env.PRIVATE_KEY.replace(/\\n/gm, "\n"),
      public: process.env.PUBLIC_KEY.replace(/\\n/gm, "\n"),
    },
    signOption: {
      issuer: process.env.SIGN_I || "backend-api",
      subject: process.env.SIGN_S || "info@backend-api.io",
      audience: process.env.SIGN_A || "https://backend-api.io",
      expiresIn: process.env.EXPIRESIN ? parseInt(process.env.EXPIRESIN) : 600,
      algorithm: "RS256", // RSASSA [ "RS256", "RS384", "RS512" ]
    },
    refreshTokenExpiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN
      ? parseInt(process.env.REFRESH_TOKEN_EXPIRES_IN)
      : 84600,
  },
  enableSeed: process.env.ENABLE_SEED == "1",
  fileExt: process.env.CDN_FILE_EXT ? process.env.CDN_FILE_EXT.split(",") : [],
  maxFileSize: process.env.MAX_FILE_SIZE || "5m",
};

(() => {
  const loadDb = () => {
    let i = 1;
    let fetch = true;
    do {
      if (
        process.env[`POSTGRES_READ_DB_NAME_${i}`] &&
        process.env[`POSTGRES_READ_DB_USER_${i}`] &&
        process.env[`POSTGRES_READ_DB_PASS_${i}`] &&
        process.env[`POSTGRES_READ_DB_HOST_${i}`] &&
        process.env[`POSTGRES_READ_DB_PORT_${i}`]
      ) {
        config.db.postgres.read.push({
          database: process.env[`POSTGRES_READ_DB_NAME_${i}`],
          username: process.env[`POSTGRES_READ_DB_USER_${i}`],
          password: process.env[`POSTGRES_READ_DB_PASS_${i}`],
          host: process.env[`POSTGRES_READ_DB_HOST_${i}`],
          port: process.env[`POSTGRES_READ_DB_PORT_${i}`],
        });
        i++;
      } else {
        fetch = false;
      }
    } while (fetch);
  };
  loadDb();
})();

module.exports = config;
