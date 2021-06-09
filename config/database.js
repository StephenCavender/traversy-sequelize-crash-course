const { Sequelize } = require('sequelize');

module.exports = new Sequelize(
  'postgres://stephencavender:@localhost:5432/postgres'
);
