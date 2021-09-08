const { request, response } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const validarJWT = async(req = request, res = response, next) =>{   
    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            msg: 'No hay token en la petición'
        })
    }

    try{
       const {uid} = jwt.verify(token, process.env.SECRETOPRIVATEKEY);

       const usuario = await Usuario.findById(uid);

       if(!usuario){
           return res.status(401).json({
               msg: 'Usuario no existe'
            })
       }
       
       if(!usuario.estado){
           return res.status(401).json({
               msg: 'Usuario esta eliminado'
            })
        }
        
        req.usuario = usuario;
        next();
    }catch(error){
        console.log(token)
        res.status(401).json({
            msg: 'Token no válido'
        })
    }
}

module.exports = {
    validarJWT
}