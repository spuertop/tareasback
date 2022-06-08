const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../database/seq.conn');

class Customer extends Model { }

Customer.init({
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

//Customer.sync({alter: true})
//Customer.sync({force: true})
module.exports = Customer;