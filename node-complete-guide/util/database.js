const Sequelize = require("sequelize");

const sequelize = new Sequelize("node-complete", "root", "shelby", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
