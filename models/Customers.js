const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../database/seq.conn');

//Associations
const Workplace = require('./Workplace')

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

//Junction table Workplace and Customers
class WorkplaceXCustomer extends Model {};
WorkplaceXCustomer.init({},{sequelize});

Workplace.belongsToMany(Customer, {through: WorkplaceXCustomer});
Customer.belongsToMany(Workplace, {through: WorkplaceXCustomer});

/* Customer.sync({alter: true})
Workplace.sync({alter:true})
WorkplaceXCustomer.sync({alter:true}) */

//Workplace.sync({force: true})
//Customer.sync({force: true})
module.exports = Customer;