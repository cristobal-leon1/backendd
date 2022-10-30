import { Router } from 'express';
import { infoUser, login, register, refreshToken, logout } from '../controllers/auth.controller.js';
const router = Router(); 
import { requireToken } from '../middlewares/requireToken.js';
import { requireRefreshToken } from '../middlewares/requireRefreshToken.js';
import { bodyValidator } from '../middlewares/validatorManager.js';

router.post('/register', bodyValidator, register)
router.post('/login', bodyValidator , login)


router.get('/protected', requireToken, infoUser);
router.get('/refresh', requireRefreshToken ,refreshToken);
router.get('/logout', logout);

export default router;