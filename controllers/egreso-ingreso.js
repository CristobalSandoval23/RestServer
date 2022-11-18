const { response, request } = require("express");
const { EgresoIngreso } = require("../models");

// obtenerCategorias - paginado - total - populate
const obtenerEgresoIngresos = async(req = request, res = response) => {
    // console.log(Date.now().getMonth());
    const {limite = 3, desde = 0, fecha = 2022} = req.query;
    const regexFecha = new RegExp(fecha, 'i');
    const regexIngreso = new RegExp("ingreso", 'i');
    const regexGasto = new RegExp("gasto", 'i');
    const query = {estado:true};
        console.log(fecha);
    const [total, data,ingreso, gasto] = await Promise.all([
        EgresoIngreso.countDocuments(query),
        EgresoIngreso.find(query)
            .populate('categoria', 'nombre')
            .skip(Number(desde))
            .limit(Number(limite)),
        EgresoIngreso.find({
            $and:[{tipo:regexIngreso}, {fecha:regexFecha}, query]
        })
        .populate('categoria', 'nombre'),
        EgresoIngreso.find({
            $and:[{tipo:regexGasto}, {fecha:regexFecha},query]
        })
        .populate('categoria', 'nombre'),,
    ])

     res.json({
        msg: 'obtenerEgresoIngresos',
        total,
        data,
        ingreso,
        gasto
    })
}
// obtenerCategoria - populate

const obtenerEgresoIngreso = async(req, res = response) => {

    const {id} = req.params;
    const EgresoIngresoId = await EgresoIngreso.findById(id).populate('usuario', 'nombre');
    
     res.json(EgresoIngresoId)
}

const crearEgresoIngreso = async(req, res = response)=> {

    const {estado, usuario, ...body} = req.body;
    
    
    const data = {
        ...body,
        usuario: req.usuario._id,
    }
    
    const egresoIngreso = new EgresoIngreso(data);
    
    await egresoIngreso.save();
    
    res.json({egresoIngreso});
    
}

// actualizarCategoria
const actualizarEgresoIngreso = async(req, res = response) =>{
    const {id} = req.params;
    const {estado, usuario, ...data} = req.body;

    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;

    const EgresoIngreso = await EgresoIngreso.findByIdAndUpdate(id, data, {new: true});

     res.json({
        msg: 'actualizarEgresoIngreso',
        EgresoIngreso
    })
    
}
// borrarCategoria - estado:false
const borrarEgresoIngreso = async(req, res = response) =>{
    
    const {id} = req.params;

    const EgresoIngresoBorrada = await EgresoIngreso.findByIdAndUpdate(id, {estado:false});

    return res.json({
        msg: 'borrarEgresoIngreso',
        EgresoIngresoBorrada
    })
}


module.exports = {
    obtenerEgresoIngresos,
    obtenerEgresoIngreso,
    crearEgresoIngreso,
    actualizarEgresoIngreso,
    borrarEgresoIngreso
}