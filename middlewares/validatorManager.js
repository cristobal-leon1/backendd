import { validationResult, body } from 'express-validator';

export const validationResultExpress = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
} 

export const bodyValidator = [
    body('email', 'Formato de email incorrecto')
        .trim()
        .isEmail()
        .normalizeEmail(),
    body('password', 'minimo 6 caracteers')
        .trim()
        .isLength({ min: 6 }),
    validationResultExpress
]