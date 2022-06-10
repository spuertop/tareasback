const { DataTypes, Model } = require('sequelize');
const {sequelize} = require('../database/seq.conn');

class Workplace extends Model {}

Workplace.init({
    name: { 
        type: DataTypes.STRING, 
        unique: {
            arg: true,
            msg: 'Ya existe otro registro con ese nombre',
        }, 
        allowNull:false },
    },{
        sequelize,
        paranoid: true
});

//Workplace.sync({alter: true})
module.exports = Workplace;