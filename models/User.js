import {Schema, model} from "mongoose";
import bcrypt from 'bcrypt';


const userSchema = new Schema({
    email: {
        type: String,
        requiered: true,
        trim: true,
        unique: true,
        lowercase: true,
        index: { unique: true} ,
    },
    password: {
        type: String,
        requiered: true,
    },
    //username: String,
    //isseller: Boolean,
});

userSchema.pre('save', async function(next){
    const user = this;

    if(!user.isModified('password')) return next();

    try {
        const saltRounds = await bcrypt.genSalt(10);
        const hash = await bcrypt.hashSync(user.password , saltRounds);
        user.password = hash;
        return next();
    } catch(error) {
        console.log(error);
        throw new Error('fallo el hash')
    }
});

userSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password)
};

export const User = model('User', userSchema);