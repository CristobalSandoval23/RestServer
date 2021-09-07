const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRoleValido = async(rol='')=>{
    const existeRol = await Role.findOne({rol});
    if(!existeRol) {
            throw new Error(`El rol ${rol} no está registrado en la BD`)
    }
}
const esCorreoValido = async(correo ='')=>{

    const existeEmail = await Usuario.findOne({correo});
        if(existeEmail){
            throw new Error(`El email ${correo}, está registrado en la BD`)
        }
}
const esUsuarioValido = async(usuario)=>{
    
    const existeUsuario = await Usuario.findById(usuario);

        if(!existeUsuario){
            throw new Error(`El usuario ${usuario} no está registrado en la BD`)
        }
}

module.exports = {
    esRoleValido,
    esCorreoValido,
    esUsuarioValido
};