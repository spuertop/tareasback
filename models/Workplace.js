const { DataTypes, Model } = require('sequelize');
const {sequelize} = require('../database/seq.conn');

class Workplace extends Model {}

Workplace.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: { type: DataTypes.STRING, allowNull: false },
},
{sequelize,
paranoid: true});

module.exports = Workplace;