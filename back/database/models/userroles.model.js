const {DataTypes} = require("sequelize");

module.exports = (sequelize) =>{
    sequelize.define("UserRoles",{},{timestamps: false});
}