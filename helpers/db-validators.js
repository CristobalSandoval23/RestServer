const { 
    Categoria, 
    Producto,
    Usuario, 
    Role 
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
const esProductoValido = async(id = '')=>{
    
    const existeProducto = await Producto.findById(id);

        if(!existeProducto){
            throw new Error(`El id ${id} del producto no está registrado en la BD`)
        }
}

module.exports = {
    esRoleValido,
    esCorreoValido,
    esUsuarioValido,
    esCategoriaValido,
    esProductoValido
};