const jwt = require('jsonwebtoken');
const {accessToken} = require('../database/seq.conn');
const User = require('../models/Users');
const auth = {};

auth.checkAuth = (req, res, next)=>{
    const token = req.get('Authorization');
    console.log(token)
    jwt.verify(token, accessToken, (err, decoded)=>{
        if(err) return res.status(401).json({msg: 'Error', error: '401 Token no válido'});
        if(decoded !== undefined){
            let userId = decoded.data.id;
            const userDB = User.findByPk(userId);
            req.userDB = userDB;
            next();
        } else {
            return res.status(401).json({msg: 'Error', error: '401 Token no válido'});
        }
    })
}

auth.checkAdmin = (req, res, next)=>{
    const role = req.auth.role;
    if(role=== 'ADMIN'){
        next()
    } else {
        return res.status(401).json({msg: 'Error', error: 'Usuario no admin'});
    }
}

module.exports = auth;