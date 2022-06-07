const { DataTypes, Model } = require('sequelize');
const {sequelize} = require('../database/seq.conn');

class Workplace extends Model {}

Workplace.init({
    name: { type: DataTypes.STRING, unique:true, allowNull:false },
},{
    sequelize,
    paranoid: true
});

//Workplace.sync({force: true})
module.exports = Workplace;