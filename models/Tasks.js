const { DataTypes, Model } = require('sequelize');
const {sequelize} = require('../database/seq.conn');

class Task extends Model {}

Task.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    description: { type: DataTypes.STRING, allowNull: false },
    department: DataTypes.STRING,
    price: DataTypes.FLOAT,
    priceHoliday: DataTypes.FLOAT
},
{sequelize,
paranoid: true});

module.exports = Task;