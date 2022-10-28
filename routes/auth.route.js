import { Router } from 'express';
import { infoUser, login, register } from '../controllers/auth.controller.js';
const router = Router(); 
import { body } from 'express-validator';
import { validationResultExpress } from '../middlewares/validationResultExpress.js';
import { requireToken } from '../middlewares/requireToken.js';

router.post('/register', [
    body('email', 'Formato de email incorrecto')
        .trim()
        .isEmail()
        .normalizeEmail(),
    body('password', 'minimo 6 caracteers')
        .trim()
        .isLength({ min: 6 })
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


router.get('/protected', requireToken, infoUser)

export default router;