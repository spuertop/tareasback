const express = require('express');
const router = express.Router();
const ctrl = require('../routes.ctrl/users.ctrl')
const auth = require('../middlewares/authentication')
//ROUTES ON '/api/users'

//router.post('/postUserSecret', ctrl.postNewUser);
//router.use(auth.checkAuth);
router.post('/postUser', ctrl.postNewUser);

//Modes Empleados -> basic (id and text), complete (all info)
router.get('/getAllUsers/:mode', ctrl.getAllUsers);
router.get('/getUser/:id', ctrl.getUserById);
router.delete('/deleteUser/:id', ctrl.deleteUserById);
router.put('/updateUser/:id', ctrl.updateUserById);


module.exports = router;