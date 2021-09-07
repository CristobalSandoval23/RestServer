const {Router} = require('express');
const {check} = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { esRoleValido, 
        esCorreoValido,
        esUsuarioValido } = require('../helpers/db-validators');

const { usuariosGet, 
        usuariosPut, 
        usuariosPatch, 
        usuariosPost, 
        usuariosDelete} = require('../controllers/usuarios');
        
const router = Router();

router.get('/', usuariosGet );
router.put('/:id',[
        check('id', 'No es un ID válido').isMongoId(),
        check('id').custom(esUsuarioValido),
        check('rol').custom(esRoleValido),
        validarCampos
        ],usuariosPut);
router.post('/', [
        check('nombre', 'El correo es obligatorio').not().isEmpty(),
        check('password', 'El password debe de ser más de 8 letras').isLength({min:8}),
        check('correo', 'El correo no es válido').isEmail(),
        check('correo').custom(esCorreoValido),
        check('rol').custom(esRoleValido),
        validarCampos
],usuariosPost);
router.delete('/:id',[
        check('id', 'No es un ID válido').isMongoId(),
        check('id').custom(esUsuarioValido),
        validarCampos
], usuariosDelete);
router.patch('/', usuariosPatch);

module.exports = router;