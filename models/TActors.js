const { DataTypes, Model } = require('sequelize');
const {sequelize} = require('../database/seq.conn');

class Actors extends Model {}

Actors.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
},
{ sequelize});

//Actors.sync({ force: true }); //actualizar sin borrar
//Actors.sync({force: true}) //a la mierda

module.exports = Actors; 