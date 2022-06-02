const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../database/seq.conn');

class Customer extends Model { }

Customer.init({
    name: { 
        type: DataTypes.STRING, 
        allowNull: false, 
        primaryKey: true },
    },
    {
        sequelize,
        paranoid: true
    });

module.exports = Customer;