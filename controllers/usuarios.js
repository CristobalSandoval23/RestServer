const {response, request} = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');


const usuariosGet = async(req = request, res = response) =>{

    
    const {limite = 3, desde = 0} = req.query;
    const query = {estado:true};
    
    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ])
    res.json({
        msg: 'Get Apiii',
        total,
        usuarios
    })
}
const usuariosPut = async(req, res = response) =>{
    const {id} = req.params;
    const {_id, password, google, correo, ...resto} = req.body;

    if(password){
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);
    res.json({
        msg: 'Put Apiii',
        usuario
    })
}
const usuariosPost = async (req, res = response) =>{

    const {nombre, correo, password, rol} = req.body;
    const usuario = new Usuario({nombre, correo, password, rol});


    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    await usuario.save();

    res.json({
        usuario
    })
}
const usuariosDelete = async(req, res = response) =>{
    const {id} = req.params;
    const usuario = await Usuario.findByIdAndUpdate(id, {estado:false});
    res.json({
        msg: 'Delete Apiii',
        usuario
    })
}
const usuariosPatch = (req, res = response) =>{
    res.json({
        msg: 'Patch Apiii'
    })
}

module.exports ={
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosPatch,
    usuariosDelete
}