import mongoose from "mongoose";


try{
    await mongoose.connect(process.env.URI_MONGO);
    console.log('conectado a db con exito')
} catch(error) {
    console.log(error)
}
