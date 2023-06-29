const config = require('app/config');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(
  null,
  null,
  null,
  {
    ...config.db.postgres.options,
    replication: {
      read: config.db.postgres.read,
      write: config.db.postgres.write,
    }
  }
);
module.exports = {
  init: async callback => {
    try {
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');
      callback(null);
    } catch (err) {
      callback(err);
    }
  },
  instanse: sequelize,
  Sequelize: Sequelize
};
