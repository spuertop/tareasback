const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../database/seq.conn');

class Customer extends Model { }

Customer.init({
    name: { type: DataTypes.STRING },
    },{
        sequelize,
        paranoid: true
    });

//Customer.sync({alter: true})
module.exports = Customer;