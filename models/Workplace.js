const { DataTypes, Model } = require('sequelize');
const {sequelize} = require('../database/seq.conn');

class Workplace extends Model {}

Workplace.init({
    name: { type: DataTypes.STRING, primaryKey: true },
},
{sequelize,
paranoid: true});

module.exports = Workplace;