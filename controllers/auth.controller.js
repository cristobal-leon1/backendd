import { User } from '../models/User.js';


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
        res.json({ ok: 'Login' })
    } catch(error) {
        console.log(error);

    }

}

