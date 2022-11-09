import {Schema, model} from "mongoose";

const cotizaSchema = new Schema({
    meb: { type: Number, required: true, trim: true, unique: true,},
    cliente: {
        type: String,
        required: true,
        trim: true,
    },
    solicitante: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        trim: true,
    },
    fono: {
        type: String,
        trim: true,
    },
    fecha: { type: Date, default: Date.now },
    solicitud: { type: Number, required: true, trim: true},
    marca: {
        type: String,
        required: true,
        trim: true,
    },
    modelo: {
        type: String,
        required: true,
        trim: true,
    },
    pn: {
        type: String,
        required: true,
        trim: true,
    },
    qty: { type: Number, required: true, trim: true},
    origen: {
        type: String,
        required: true,
        trim: true,
    },
    iso: { type: Number, trim: true},
    oc: { type: Number, trim: true},
    order_confir: {
        type: String,
        trim: true,
    },
    p_unitario_venta: {
        type: String,
        required: true,
        trim: true,
    },
    p_total_venta: { type: Number, trim: true}, // p_total_venta, entregada, entregada1,  entregada2,  guiad, factura, num_credito, nva_factura
    entregada: { type: String, trim: true,},
    entregada1: { type: String, trim: true,},
    entregada2: { type: String, trim: true,},
    guiad: {
        type: String,
        trim: true,
    },
    factura: {
        type: String,
        trim: true,
    },
    num_credito: {
        type: String,
        trim: true,
    },
    nva_factura: {
        type: String,
        trim: true,
    },
});

export const Cotizacion = model('Cotizacion', cotizaSchema);