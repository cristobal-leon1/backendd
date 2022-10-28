import jwt from 'jsonwebtoken';

export const requireToken = (req, res, next) => {


    try {
        let token = req.headers?.authorization
        if (!token) throw new Error('no existe token')

        token = token.split(" ")[1];
        const payload = jwt.verify(token, process.env.JWT_SECRET);


        next();
    } catch(error) {
        console.log(error);
        return res.status(401).json({ error: error.message})
    }
}