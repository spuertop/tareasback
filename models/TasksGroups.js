const { DataTypes, Model } = require('sequelize');
const {sequelize} = require('../database/seq.conn');
const Task = require('./Tasks');

class TaskGroup extends Model {}

TaskGroup.init({
    description: { type: DataTypes.STRING, allowNull: false, unique: true },
    },{
        sequelize,
        paranoid: true
});


TaskGroup.hasMany(Task);
Task.belongsTo(TaskGroup);


//TaskGroup.sync({force: true})
//Task.sync({force:true}) 
module.exports = TaskGroup;