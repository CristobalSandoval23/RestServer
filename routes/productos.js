const {Router} = require('express');

const { validarJWT, esAdminRole } = require('../middlewares');
const {check} = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { 
    crearProducto, 
    actualizarProducto,
    borrarProducto, 
    obtenerProducto,
    obtenerProductos
 } = require('../controllers/productos');
const { esProductoValido } = require('../helpers/db-validators');

const router = Router();

router.get('/', obtenerProductos);

router.get('/:id', [
    check('id', 'No es un id de mongoose').isMongoId(),
    check('id').custom(esProductoValido),
    validarCampos,
],obtenerProducto);

router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
],crearProducto);

router.put('/:id',[
    validarJWT,
    check('id').custom(esProductoValido),
    validarCampos
],actualizarProducto);

router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un id de mongo').isMongoId(),
    check('id').custom(esProductoValido),
],borrarProducto);


module.exports = router;