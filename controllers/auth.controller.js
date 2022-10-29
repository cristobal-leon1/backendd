import { User } from '../models/User.js';
import jwt from 'jsonwebtoken';
import { generateRefreshToken, generateToken } from '../utils/tokenManager.js';


export const register = async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = new User( {email, password })
        //let user = await User.findOne({ email })

        await user.save();

        //generar token jwt

        return res.json({ ok: true })
    } catch(error) {
        console.log(error);
        if(error.code === 11000) {
            return res.status(400).json({ error:"email ya registrado"})
        }
    }
}

export const login = async (req, res) => {
    const {email, password} = req.body;
    try {
        let user = await User.findOne({ email })

        if(!user) return res.status(400).json({ error:"no existe el usuario"})

        const respuestaPW = await user.comparePassword(password)
        if(!respuestaPW) return res.status(400).json({ error:"credenciales incorrectas"})

        //generar token jwt
        const {token, expiresIn} = generateToken( user.id)

        //COOKIE PARSER
        
        generateRefreshToken(user.id, res)

        res.json({ token, expiresIn })
    } catch(error) {
        console.log(error);
        return res.status(500).json({ error: 'error de servidor'})
    }

}

export const infoUser = async (req, res) => {
    try {
        const user = await User.findById(req.uid).lean()
        return res.json( { email: user.email, uid: user.uid });

    } catch(error) {
        return res.status(500).json({ error: 'error de servidor'})
    }
    
}

export const refreshToken = (req, res) => {

    

    try {

        const refreshTokenCookie = req.cookies.refreshToken;
        if (!refreshTokenCookie) throw new Error('no existe token')

        const {uid} = jwt.verify(refreshTokenCookie, process.env.JWT_REFRESH);
        const {token, expiresIn} = generateToken(uid);

        res.json({ token, expiresIn })
    } catch(error) {
        console.log(error);
        return res.status(401).json({ error: error.message})
    }
}

export const logout = (req, res) => {
    res.clearCookie('refreshToken');
    res.json({ ok: true})
    
}
