import jwt from 'jsonwebtoken';

export const generateToken = (uid) => {
    try {
        const token = jwt.sign({ udi: user._id }, process.env.JWT_SECRET);
    } catch(error) {
        console.log(error);
    }
}