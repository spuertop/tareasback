const { DataTypes, Model } = require('sequelize');
const {sequelize} = require('../database/seq.conn');

class Department extends Model {}

Department.init({
    description: { type: DataTypes.STRING },
    },{
        sequelize,
        paranoid: true
    });

//Department.sync({alter: true})
module.exports = Department;