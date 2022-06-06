const { DataTypes, Model } = require('sequelize');
const {sequelize} = require('../database/seq.conn');
const Actors = require('./TActors')

class Movie extends Model {}

Movie.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
},
{ sequelize});

class ActorXMovie extends Model {};
ActorXMovie.init({},{sequelize});

Actors.belongsToMany(Movie, {through: ActorXMovie});
Movie.belongsToMany(Actors, {through: ActorXMovie});

//Movie.sync({ alter: true }); //actualizar sin borrar
//Movie.sync({force: true}) //a la mierda
//ActorXMovie.sync({force:true})

module.exports = {Movie, ActorXMovie};