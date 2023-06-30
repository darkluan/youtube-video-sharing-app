require("dotenv").config();
module.exports = {
  username: process.env.POSTGRES_WRITE_DB_USER,
  password: process.env.POSTGRES_WRITE_DB_PASS,
  database: process.env.POSTGRES_WRITE_DB_NAME,
  host: process.env.POSTGRES_WRITE_DB_HOST,
  port: process.env.POSTGRES_WRITE_DB_PORT,
  dialect: "postgres",
  operatorsAliases: 0,
  dialectOptions: {
    ssl: process.env.POSTGRES_SSL_MODE === "true",
  },
  define: {
    underscored: true,
    underscoredAll: true,
  },
};
