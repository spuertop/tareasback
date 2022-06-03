const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../database/seq.conn');

class Customer extends Model { }

Customer.init({
    name: { type: DataTypes.STRING, primaryKey: true },
    code: {type: DataTypes.INTEGER,autoIncrement: true},
    workplace: DataTypes.STRING
    },{
        sequelize,
        paranoid: true
    });

module.exports = Customer;