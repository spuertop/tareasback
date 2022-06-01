const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/Users');
const jwt = require('jsonwebtoken');
const {accessToken} = require('../database/seq.conn');

//ROUTES ON '/api/login'

router.post('/', async (req, res)=> {
    try {
        const body = req.body;
        const userDB = await User.findOne(body.id_txt);
        if(!userDB) return res.status(404).json({msg: "Error", error: 'Usuario incorrecto'});
        if(!bcrypt.compareSync(body.pass, userDB.pass)){
            return res.status(400).json({msg: "Error", error: 'Contraseña incorrecta'})
        }
        let token = jwt.sign({
            data: userDB.getTokenData()
        }, accessToken,  {expiresIn: 60*60}); //60*60 es una hora, 60*60*24*30 un mes
        res.status(200).json({token, user: userDB.getDataFront()})
    } catch (error) {
        return res.status(500).json({msg: "Error", error: error.toString()})
    }

})






module.exports = router;