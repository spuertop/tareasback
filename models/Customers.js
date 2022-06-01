const { DataTypes, Model } = require('sequelize');
const {sequelize} = require('../database/seq.conn');

class Customer extends Model {}

Customer.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: { type: DataTypes.STRING, allowNull: false },
},
{sequelize,
paranoid: true});

module.exports = Customer;