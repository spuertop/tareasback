let userCtrl = {};
const User = require('../models/Users');
const bcrypt = require('bcrypt');
const saltRound = 10;

userCtrl.postNewUser = async(req, res)=> {
    const body = req.body;
    if(body.pass?.length < 4 || !body.pass){
        return res.status(500).json({msg: "Contraseña corta"})} 
    try {
        body.pass = bcrypt.hashSync(body.pass, saltRound);
        const userDB = await User.create(body);
        userDB.update({id_txt: String(userDB.id).padStart(4,'0')})
        return res.status(200).json(userDB);
    } catch (error) {
        return res.status(500).json({msg: "Error", error: error.toString()})
    }
}

userCtrl.getAllUsers = async(req, res)=>{
    try {
        let usersListDB;
        switch(req.params.mode){
            case 'basic': //Empleados basic
                usersListDB = await User.findAll({ where: User.whereRoleEmpleado(), attributes: User.basicAttr() });
                break;
            case 'complete': //Empleados complete
                usersListDB = await User.findAll({where: User.whereRoleEmpleado()}); 
                break;
            case 'users': //Admins y users
                usersListDB = await User.findAll({where: User.whereRoleNotEmpleado()}); 
                break;
            default:
                return res.status(500).json({msg: "Error", error: 'Invalid mode'})
        }
        return res.status(200).json(usersListDB);
    } catch (error) {
        return res.status(500).json({msg: "Error", error: error.toString()})
    }
}

userCtrl.getUserById = async(req, res)=> {
    try {
        let id = req.params.id;
        const userDB = await User.findByPk(id);
        return res.status(200).json(userDB);
    } catch (error) {
        return res.status(500).json({msg: "Error", error: error.toString()})
    }
}

userCtrl.deleteUserById = async(req, res)=>{
    try {
        let id = req.params.id;
        const userDB = await User.destroy({where: {id}});
        if(userDB === 0){
            return res.status(404).json({msg: "Error", error: 'No se han encontrado registros para borrar', rowsAffected : userDB, id });
        } else {
            return res.status(200).json({msg: "Success", rowsAffected: userDB, id})
        }
    } catch (error) {
        return res.status(500).json({msg: "Error", error: error.toString()})
    }
}

userCtrl.updateUserById = async(req, res)=>{
    try {
        const id = req.params.id;
        const {name} = req.body;
        const newData = {name};
        const userDB = await User.update(newData,{where:{id}});
        if(userDB[0] === 0){
            return res.status(404).json({msg: "Error", error: 'No se han encontrado registros para actualizar', rowsAffected : userDB,id});
        } else {
            const updatedUser = await User.findByPk(id);
            return res.status(200).json(updatedUser);
        }
    } catch (error) {
        return res.status(500).json({msg: "Error",error: error.toString()})
    }
}

module.exports = userCtrl;