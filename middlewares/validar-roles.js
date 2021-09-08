const { response } = require("express");
const router = require("../routes/user");


const esAdminRole = (req, res = response, next) =>{
    if(!req.usuario){
        return res.status(500).json({
            msg: 'Se quiere verificar el rol'
        })
    }
    
    const {rol, nombre} = req.usuario;
    
    if(rol != 'ADMIN_ROLE'){
        return res.status(401).json({
            msg: `el ${nombre} NO es un administrador`
        })
        
    }

    next();
}

const tieneRole = (...roles) =>{
    return (req, res = response, next) => {
        console.log(roles);
        if(!req.usuario){
            return res.status(500).json({
                msg: 'Se quiere verificar el rol'
            })
        }
        
        if(!roles.includes(req.usuario.rol)){
            return res.status(401).json({
                msg: `Se requiere uno de estos roles: ${roles}`
            })
        }

        next();
    }
}
module.exports = {
    esAdminRole,
    tieneRole
}