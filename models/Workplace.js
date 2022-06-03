const { DataTypes, Model } = require('sequelize');
const {sequelize} = require('../database/seq.conn');

class Workplace extends Model {}

Workplace.init({
    name: { type: DataTypes.STRING, primaryKey: true },
    code: {type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false}
},
{sequelize,
paranoid: true});

//Workplace.sync({alter: true})
module.exports = Workplace;