const { response, request } = require("express");
const { Producto } = require("../models");

// obtenerCategorias - paginado - total - populate
const obtenerProductos = async(req = request, res = response) => {

    const {limite = 3, desde = 0} = req.query;
    const query = {estado:true};

    const [total, data] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
            .populate('usuario', 'nombre')
            .skip(Number(desde))
            .limit(Number(limite))
    ])

     res.json({
        msg: 'obtenerProductos',
        total,
        data
    })
}
// obtenerCategoria - populate

const obtenerProducto = async(req, res = response) => {

    const {id} = req.params;
    const productoId = await Producto.findById(id).populate('usuario', 'nombre');
    
     res.json(productoId)
}

const crearProducto = async(req, res = response)=> {
    
    const {estado, usuario, ...body} = req.body;
    
    const productoDB = await Producto.findOne({nombre: body.nombre});
    
    if(productoDB){
        return res.status(400).json({
            msg: `El producto ${productoDB.nombre} ya existe en DB`
        })
    }
    
    const data = {
        ...body,
        nombre: body.nombre.toUpperCase(),
        usuario: req.usuario._id
    }
    
    const producto = new Producto(data);
    
    await producto.save();
    
    res.status(201).json(producto);
    
}

// actualizarCategoria
const actualizarProducto = async(req, res = response) =>{
    const {id} = req.params;
    const {estado, usuario, ...data} = req.body;

    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;

    const producto = await Producto.findByIdAndUpdate(id, data, {new: true});

     res.json({
        msg: 'actualizarProducto',
        producto
    })
    
}
// borrarCategoria - estado:false
const borrarProducto = async(req, res = response) =>{
    
    const {id} = req.params;

    const productoBorrada = await Producto.findByIdAndUpdate(id, {estado:false});

    return res.json({
        msg: 'borrarProducto',
        productoBorrada
    })
}


module.exports = {
    obtenerProductos,
    obtenerProducto,
    crearProducto,
    actualizarProducto,
    borrarProducto
}