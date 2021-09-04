const {response, request} = require('express');

const usuariosGet = (req = request, res = response) =>{

    const {nombre = "No dato"} = req.query;
    res.json({
        msg: 'Get Apiii',
        nombre
    })
}
const usuariosPut = (req, res = response) =>{
    const {id} = req.params;
    res.json({
        msg: 'Put Apiii',
        id
    })
}
const usuariosPost = (req, res = response) =>{

    const body = req.body;

    res.json({
        msg: 'Post Apiii',
        body
    
    })
}
const usuariosPatch = (req, res = response) =>{
    res.json({
        msg: 'Patch Apiii'
    })
}
const usuariosDelete = (req, res = response) =>{
    res.json({
        msg: 'Delete Apiii'
    })
}

module.exports ={
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosPatch,
    usuariosDelete
}