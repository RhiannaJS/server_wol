const{DataTypes} = require("sequelize");
const db = require("../db");

const User = db.define("user", {
    email: {
        require: true,
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
    },
    password: {
        require: true,
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = User;