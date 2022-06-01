const { DataTypes, Model } = require('sequelize');
const {sequelize} = require('../database/seq.conn');

class Department extends Model {}

Department.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    description: { type: DataTypes.STRING, allowNull: false },
},
{sequelize,
paranoid: true});

module.exports = Department;