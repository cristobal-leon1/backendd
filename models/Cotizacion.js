import {Schema, model} from "mongoose";

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

export const Cotizacion = model('Cotizacion', userSchema);