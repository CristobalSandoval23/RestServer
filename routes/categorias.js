const {Router} = require('express');

const { validarJWT, esAdminRole } = require('../middlewares');
const {check} = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { 
    crearCategoria, 
    actualizarCategoria,
    borrarCategoria, 
    obtenerCategoria,
    obtenerCategorias
 } = require('../controllers/categorias');
const { esCategoriaValido } = require('../helpers/db-validators');

const router = Router();

router.get('/', obtenerCategorias);

router.get('/:id', [
    check('id', 'No es un id de mongoose').isMongoId(),
    check('id').custom(esCategoriaValido),
    validarCampos,
],obtenerCategoria);

router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('color', 'El color es obligatorio').not().isEmpty(),
    validarCampos
],crearCategoria);

router.put('/:id',[
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom(esCategoriaValido),
    validarCampos
],actualizarCategoria);

router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un id de mongo').isMongoId(),
    check('id').custom(esCategoriaValido),
],borrarCategoria);


module.exports = router;