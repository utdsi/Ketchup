

const { Sequelize, DataTypes } = require("sequelize")


const sequelize = new Sequelize("Flutter", "root", "Hello123", {

    host: "localhost",
    dialect: "mysql"
})

module.exports = { sequelize }