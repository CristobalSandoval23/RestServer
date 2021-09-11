const { Router } = require("express");
const { check } = require("express-validator");
const {validarCampos, validarArchivoSubir} = require('../middlewares')
const {
    cargarArchivo, 
    mostrarImagen, 
    actualizarArchivoCloudinary 
        } = require("../controllers/upload");
const { coleccionesPermitidas } = require("../helpers/db-validators");

const router = Router()

router.get('/:coleccion/:id', [
    check('id', 'Ei id debe de ser de mongo').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c, ['usuarios', 'productos'])),
    validarCampos
    ],mostrarImagen)
router.post('/', 
    validarArchivoSubir,
    cargarArchivo)
router.put('/:coleccion/:id', [
    validarArchivoSubir,
    check('id', 'Ei id debe de ser de mongo').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c, ['usuarios', 'productos'])),
    validarCampos
    ],actualizarArchivoCloudinary)

module.exports = router;