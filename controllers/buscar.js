const { response } = require("express");
const { ObjectId } = require("mongoose").Types;

const {
        Usuario, 
        Categoria, 
        EgresoIngreso
    } = require('../models')

const colecccionesPermitidas = [
    'usuarios',
    'categorias',
    'ingresos',
    'role'
]

const buscarUsuarios = async(termino = '', res = response)=>{
    const esMongoID = ObjectId.isValid(termino);
    
    if(esMongoID){
        const usuario = await Usuario.findById(termino);
       return res.json({
            results: (usuario) ? [usuario] : []
        })

    }

    const regex = new RegExp(termino, 'i');

    const usuarios = await Usuario.find({
        $or:[{nombre:regex}, {correo:regex}]
    });
    res.json({
        results: usuarios
    })
}
const buscarCategorias = async(termino = '', res = response)=>{
    const esMongoID = ObjectId.isValid(termino);
    
    if(esMongoID){
        const categoria = await Categoria.findById(termino);
       return res.json({
            results: (categoria) ? [categoria] : []
        })

    }

    const regex = new RegExp(termino, 'i');

    const categorias = await Categoria.find({nombre:regex}, {estado:true});
    res.json({
        results: categorias
    })
}
const buscarIngresosEgresos = async(termino = '', categoria = '',res = response)=>{
    
    const esMongoID = ObjectId.isValid(termino);
    const esMongoIDCategoria = ObjectId.isValid(categoria);
    
    if(esMongoID){
        const egresoIngreso = await EgresoIngreso.findById(termino);
       return res.json({
            results: (egresoIngreso) ? [egresoIngreso] : []
        })

    }

    // const regex = new RegExp(termino, 'i');
    const regex = new RegExp(termino, 'i');
    const regexCategoria = new RegExp(categoria, 'i');
    
    var Navidad = new Date('04 25');
    var mes = Navidad.getMonth();
    console.log(mes);
    const [egresoIngresos, fecha] = await Promise.all([
                        EgresoIngreso.countDocuments({estado:false}),
                        EgresoIngreso.find({$and:[
                            {fecha:regex}
                        ]})
                    ]);
    console.log(egresoIngresos, termino);
    res.json({
        results: egresoIngresos,
        fecha
    })
}

const buscar = (req, res = response) => {
    console.log(req);
    
    const {coleccion, termino} = req.params;
    const {categoria} = req.query;

    if(!colecccionesPermitidas.includes(coleccion)){
        return res.status(400).json({
            msg: `Las coleccciones permitidas son: ${colecccionesPermitidas}`
        })
    }

    switch (coleccion) {
        case 'usuarios':
            buscarUsuarios(termino, res);
            break;
        case 'categorias':
            buscarCategorias(termino, res);
            break;
            case 'ingresos':
            buscarIngresosEgresos(termino,categoria, res);
            break;
    
        default:
            res.status(500).json({
                msg: 'Se le olvido hacer esta busqueda'
            })
    }
}


module.exports = {
    buscar
}