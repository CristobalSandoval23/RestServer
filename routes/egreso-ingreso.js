const {Router} = require('express');

const { validarJWT, esAdminRole } = require('../middlewares');
const {check} = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { 
    crearEgresoIngreso, 
    actualizarEgresoIngreso,
    borrarEgresoIngreso, 
    obtenerEgresoIngreso,
    obtenerEgresoIngresos
 } = require('../controllers/egreso-ingreso');
const { esEgresoIngresoValido, esTipoValido } = require('../helpers/db-validators');

const router = Router();

router.get('/', obtenerEgresoIngresos);

router.get('/:id', [
    check('id', 'No es un id de mongoose').isMongoId(),
    check('id').custom(esEgresoIngresoValido),
    validarCampos,
],obtenerEgresoIngreso);

router.post('/', [
    validarJWT,
    check('tipo', 'El tipo es obligatorio').not().isEmpty(),
    check('tipo').custom(esTipoValido),
    check('categoria', 'La categoria es obligatorio').not().isEmpty(),
    validarCampos
],crearEgresoIngreso);

router.put('/:id',[
    validarJWT,
    check('id').custom(esEgresoIngresoValido),
    validarCampos
],actualizarEgresoIngreso);

router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un id de mongo').isMongoId(),
    check('id').custom(esEgresoIngresoValido),
],borrarEgresoIngreso);


module.exports = router;