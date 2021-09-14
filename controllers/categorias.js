const { response, request } = require("express");
const { Categoria } = require("../models");

// obtenerCategorias - paginado - total - populate
const obtenerCategorias = async(req = request, res = response) => {

    const {limite = 3, desde = 0} = req.query;
    const query = {estado:true};

    const [total, data] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
            .populate('usuario', 'nombre')
            .skip(Number(desde))
            .limit(Number(limite))
    ])

     res.json({
        msg: 'obtenerCategorias',
        total,
        data
    })
}
// obtenerCategoria - populate

const obtenerCategoria = async(req, res = response) => {

    const {id} = req.params;
    const categoriaId = await Categoria.findById(id).populate('usuario', 'nombre');
    
     res.json(categoriaId)
}

const crearCategoria = async(req, res = response)=> {
    
    const nombre = req.body.nombre.toUpperCase();
    
    const categoriasDB = await Categoria.findOne({nombre});
    
    if(categoriasDB){
        return res.status(400).json({
            msg: `La categoria ${categoriasDB.nombre} ya existe en DB`
        })
    }
    
    const data = {
        nombre,
        usuario: req.usuario._id
    }
    
    const categoria = new Categoria(data);
    
    await categoria.save();
    
    res.status(201).json(categoria);
    
}

// actualizarCategoria
const actualizarCategoria = async(req, res = response) =>{
    const {id} = req.params;
    const {estado, usuario, ...data} = req.body;

    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;

    const categoria = await Categoria.findByIdAndUpdate(id, data, {new: true});

     res.json({
        msg: 'actualizarCategoria',
        categoria
    })
    
}
// borrarCategoria - estado:false
const borrarCategoria = async(req, res = response) =>{
    
    const {id} = req.params;

    const categoriaBorrada = await Categoria.findByIdAndUpdate(id, {estado:false});

    return res.json({
        msg: 'borrarCategoria',
        categoriaBorrada
    })
}


module.exports = {
    obtenerCategorias,
    obtenerCategoria,
    crearCategoria,
    actualizarCategoria,
    borrarCategoria
}