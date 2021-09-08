const  {response} = require('express');
const bcryptjs = require('bcryptjs')
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/generar-jwt');

const login = async(req, res = response) => {

    const {correo, password} = req.body;

    try{
        const usuario = await Usuario.findOne({correo})
        if(!usuario){
            return res.status(400).json({
                msg: 'Usuario/Password no son correctos'
            })
        }
        if(!usuario.estado){
            return res.status(400).json({
                msg: 'Usuario/Password no son correctos - estado : False'
            })
        }
        
        const validPassword = bcryptjs.compareSync (password, usuario.password);
        if(!validPassword){
            return res.status(400).json({
                msg: 'Usuario/Password no son correctos - Password'
            })
        }

        const token = await generarJWT(usuario.id);
        
        res.json({
            msg:'Login ok',
            usuario,
            token
        })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            msg: 'hablé con el administrador'
        })
    }
}

module.exports = {
    login
}

