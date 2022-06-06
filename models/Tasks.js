const { DataTypes, Model } = require('sequelize');
const {sequelize} = require('../database/seq.conn');

class Task extends Model {}

Task.init({
    description: { type: DataTypes.STRING, allowNull: false },
    department: DataTypes.STRING,
    price: DataTypes.FLOAT,
    priceHoliday: DataTypes.FLOAT
},{
    sequelize,
    paranoid: true
});

//Task.sync({alter: true})
module.exports = Task;