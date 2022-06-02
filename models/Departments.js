const { DataTypes, Model } = require('sequelize');
const {sequelize} = require('../database/seq.conn');

class Department extends Model {}

Department.init({
    description: { type: DataTypes.STRING, primaryKey: true },
},
{sequelize,
paranoid: true});

module.exports = Department;