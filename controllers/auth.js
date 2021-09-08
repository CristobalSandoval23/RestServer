const  {response} = require('express');
const bcryptjs = require('bcryptjs')
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/generar-jwt');
const { googleVerifiy } = require('../helpers/google-verify');

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

const googleSignin = async(req, res = response)=>{

    const {id_token} = req.body;

    try {
        const {correo, nombre, img} = await googleVerifiy(id_token);
        let usuario = await Usuario.findOne({correo});

        if(!usuario){
            const data = {
                nombre, 
                correo,
                password:':P',
                img,
                google:true
            }

            usuario = new Usuario(data);

            await usuario.save();
        }

        if(!usuario.estado){
            return res.status(401).json({
                msg: 'Hable con el administrador'
            })
        }

        const token = await generarJWT(usuario.id);

        res.json({
            msg: 'TODO ok! google signin',
            usuario,
            token
        })
    } catch (error) {
        res.status(400).json({
            msg: 'Token de Google no es válido'
        })
    }


}

module.exports = {
    login,
    googleSignin
}

