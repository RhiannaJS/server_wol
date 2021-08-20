const {DataTypes} = require("sequelize");
const db = require("../db");

const Log = db.define("log", {
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    definitions: {
        type: DataTypes.STRING,
        allowNull: true
    },
    results: {
        type: DataTypes.STRING,
        allowNull: false
    },
    owner: {
        type: DataTypes.INTEGER
    }
});

module.exports = Log;