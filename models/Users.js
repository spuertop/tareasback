const { DataTypes, Model } = require('sequelize');
const {sequelize} = require('../database/seq.conn');
const { Op } = require("sequelize");

class User extends Model {
    static roles(){
        return ['Administrador', 'Usuario', 'Empleado']
    }
    static whereRoleEmpleado(){
        return {role: 'Empleado'}
    }
    static whereRoleNotEmpleado(){
        return {role:{[Op.ne]: 'Empleado'}}
    }
    static basicAttr(){
        return ['id', 'id_txt','name']
    }
    getPassword() {
        return this.password
    }
    getBasicData(){
        return {id: this.id, id_txt: this.id_txt, name: this.name}
    }
    getTokenData(){
        let {id, id_txt, name, role} = this;
        return {id, id_txt, name, role};
    }
    getDataFront(){
        let {id, id_txt, name, role, rights, bookmarks} = this;
        return {id, id_txt, name, role, rights, bookmarks}
    }
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    id_txt: { type: DataTypes.STRING},
    name: { type: DataTypes.STRING, allowNull: false },
    pass: { type: DataTypes.STRING, allowNull: false },
    role: { 
        type: DataTypes.STRING, 
        defaultValue: ()=> 'Empleado',
        validate: {
            isIn: {
                args: [['Administrador', 'Empleado', 'Usuario']],
                msg: "Categoría no válida"
            }
        }
    },
    rights: { type: DataTypes.TEXT },
    //active: { type: DataTypes.BOOLEAN, defaultValue: ()=>true },
    department: { type: DataTypes.STRING },
    bookmarks: { type: DataTypes.TEXT },
},
{ sequelize,
paranoid: true });

//sequelize.sync({ alter: true }); //actualizar sin borrar
//User.sync({force: true}) //a la mierda

module.exports = User;