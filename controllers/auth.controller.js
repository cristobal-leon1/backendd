import { User } from '../models/User.js';
import { generateRefreshToken, generateToken } from '../utils/tokenManager.js';


export const register = async (req, res) => {
    const {email, nombre, password} = req.body;
    try {
        const user = new User( {email, nombre, password })
        //let user = await User.findOne({ email })

        await user.save();

        //generar token jwt
        const {token, expiresIn} = generateToken( user.id)

        //COOKIE PARSER
        
        generateRefreshToken(user.id, res)

        return res.json({ token, expiresIn })
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

        return res.json({ token, expiresIn })
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

        const {token, expiresIn} = generateToken(req.uid);

        return res.json({ token, expiresIn })
    } catch(error) {
        console.log(error);
        return res.status(500).json({ error: 'error de servidor'})
    }
}

export const logout = (req, res) => {
    res.clearCookie('refreshToken');
    res.json({ ok: true})

}
