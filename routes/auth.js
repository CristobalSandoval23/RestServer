const {Router} = require('express');
const {check} = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { login, googleSignin } = require('../controllers/auth');

const router = Router();

router.post('/login', [
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatorio').notEmpty(),
    validarCampos
],login);

router.post('/google', [
    check('id_token', 'Es necesario el id TOKEN').not().isEmpty(),
    validarCampos
],googleSignin);


module.exports = router;