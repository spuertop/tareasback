const { DataTypes, Model } = require('sequelize');
const {sequelize} = require('../database/seq.conn');

class Record extends Model {}

Record.init({
    /*WorkPlace.name*/centro: DataTypes.STRING,
    /*User.id*/codigoUsuario: DataTypes.STRING,
    /*User.name*/nombreUsuario:DataTypes.STRING,
    empresa: { type: DataTypes.STRING, defaultValue: ()=> 'Moldstock'},
    /*Customer.name*/cliente: DataTypes.STRING, 
    /*Task.id*/codigoServicio:DataTypes.STRING,
    /*Task.Description*/descripcionServicio: DataTypes.STRING,
    /*Task.Price*/precioServicio:DataTypes.FLOAT,
    /*Task.Department*/
    dia:DataTypes.DATEONLY,
    /*Holiday.type*/tipoDia:{ type: DataTypes.STRING, defaultValue: ()=> 'Laborable'},
    horaInicio: DataTypes.DATE,
    horaFin: DataTypes.DATE,
    duracion:DataTypes.FLOAT,
    importe:DataTypes.FLOAT,
    observaciones: DataTypes.STRING,
},
{sequelize});

module.exports = Record;