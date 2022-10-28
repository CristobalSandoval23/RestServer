const { 
    Categoria, 
    EgresoIngreso,
    Usuario, 
    Role, 
    Tipo
} = require('../models');


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
const esCategoriaValido = async(id = '')=>{
    
    const existeCategoria = await Categoria.findById(id);

        if(!existeCategoria){
            throw new Error(`El id ${id} no está registrado en la BD`)
        }
}
const esEgresoIngresoValido = async(id = '')=>{
    
    const existeEgresoIngreso = await EgresoIngreso.findById(id);

        if(!existeEgresoIngreso){
            throw new Error(`El id ${id} del EgresoIngreso no está registrado en la BD`)
        }
}
const esTipoValido = async(tipo = '')=>{
    
    const existeTipo = await Tipo.findOne({tipo});

        if(!existeTipo){
            throw new Error(`El tipo ${tipo} del EgresoIngreso no está registrado en la BD`)
        }
}

const coleccionesPermitidas = async(coleccion = '', colecciones = '')=>{
    
    const incluida = colecciones.includes(coleccion);

        if(!incluida){
            throw new Error(`La ${coleccion} no es permitida: ${colecciones}`)
        }

        return true;
}

module.exports = {
    esRoleValido,
    esCorreoValido,
    esUsuarioValido,
    esCategoriaValido,
    esEgresoIngresoValido,
    esTipoValido,
    coleccionesPermitidas
};