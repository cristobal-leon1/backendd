import express from 'express';
import { login, register } from '../controllers/auth.controller.js';
const router = express.Router(); 
import { body } from 'express-validator';
import { validationResultExpress } from '../middlewares/validationResultExpress.js';

router.post('/register', [
    body('email', 'Formato de email incorrecto')
        .trim()
        .isEmail()
        .normalizeEmail(),
    body('password', 'minimo 6 caracteers')
        .trim()
        .isLength({ min: 6 })
        ,
    body('password', 'Formato de password incorrecta')
        .custom((value, {req}) => {
            if(value !== req.body.repassword) throw new Error(' no coinciden las contraseñas ')
            return value;
        })
],
validationResultExpress,
register)

router.post('/login', [
    body('email', 'Formato de email incorrecto')
        .trim()
        .isEmail()
        .normalizeEmail(),
    body('password', 'minimo 6 caracteers')
        .trim()
        .isLength({ min: 6 })
        ,
],
validationResultExpress,
login)




export default router;