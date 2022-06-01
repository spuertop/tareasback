const { DataTypes, Model } = require('sequelize');
const {sequelize} = require('../database/seq.conn');
const { Op } = require("sequelize");

class Record extends Model {}

Record.init({
    centro: DataTypes.STRING,
    codigoUsuario: DataTypes.STRING,
    nombreUsuario:DataTypes.STRING,
    empresa: { type: DataTypes.STRING, defaultValue: 'Moldstock'},
    cliente: DataTypes.STRING, 
    codigoServicio:DataTypes.STRING,
    descripcionServicio: DataTypes.STRING,
    precioServicio:DataTypes.FLOAT,
    dia:DataTypes.DATEONLY,
    tipoDia:{ type: DataTypes.STRING, defaultValue: 'Laborable'},
    horaInicio:{ type: DataTypes.DATE },
    horaFin: DataTypes.DATE,
    duracion:DataTypes.FLOAT,
    importe:DataTypes.FLOAT,
    observaciones: DataTypes.STRING,
},
{sequelize});

module.exports = Record;