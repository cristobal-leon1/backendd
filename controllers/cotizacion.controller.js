import { Cotizacion } from "../models/Cotizacion.js";


export const getCotizaciones = async (req, res) => {
    try {

        const cotizaciones = await Cotizacion.find().sort('-fecha');


        return res.json({ cotizaciones });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "error de servidor" });
    }
};

export const createCotizacion = async (req, res) => {
    try {
        let { meb, cliente, solicitante, email, fono, solicitud, marca, modelo, pn, qty, origen, iso, oc, order_confir, p_unitario_venta, p_total_venta, entregada, entregada1,  entregada2,  guiad, factura, num_credito, nva_factura} = req.body;
        const cotizacion = new Cotizacion({ meb, cliente, solicitante, email, fono, solicitud, marca, modelo, pn, qty, origen, iso, oc, order_confir, p_unitario_venta, p_total_venta, entregada, entregada1,  entregada2,  guiad, factura, num_credito, nva_factura });
        const newCotizacion = await cotizacion.save();

        return res.status(201).json({ newCotizacion });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "error de servidor" });
    }
};

export const getCotizacion = async (req, res) => {
    try {
        const { cliente } = req.params;
        const cotizacion = await Cotizacion.find({ cliente });
        //console.log('get cotizacion') 

        // get clientes sin repetir
        if (cliente == 'b8385723a96a6b838858cdd6ca0a1e') {
            const cotizaciones = await Cotizacion.distinct('cliente')
            return res.json({ cotizaciones });

        } 
        //if (!cotizacion) return res.status(404).json({ error: "No existe la cotizacion" });

        //if(!link.uid.equals(req.uid)) return res.status(401).json({ error: "error en las credenciales"})


        return res.json({ cotizacion });
    } catch (error) {
        console.log(error);
        if (error.kind === "ObjectId") {
            return res.status(403).json({ error: "Formato id incorrecto" });
        }
        return res.status(500).json({ error: "error de servidor" });
    }
};


export const removeCotizacion = async (req, res) => {
    try {
        const { meb } = req.params;
        const cotizacion = await Cotizacion.findOne({ meb });

        if (!cotizacion) return res.status(404).json({ error: "No existe la cotizacion" });
        
        await cotizacion.remove();

        return res.json({ cotizacion });
    } catch (error) {
        console.log(error);
        if (error.kind === "ObjectId") {
            return res.status(403).json({ error: "Formato id incorrecto" });
        }
        return res.status(500).json({ error: "error de servidor" });
    }
};

export const updateCotizacion = async (req, res) => {
    try {
        const { meb } = req.params;
        let {cliente, solicitante, email, fono, solicitud, marca, modelo, pn, qty, origen, iso, oc, order_confir, p_unitario_venta, p_total_venta, entregada, entregada1,  entregada2,  guiad, factura, num_credito, nva_factura, estado} = req.body;




        const cotizacion = await Cotizacion.findOne({ meb });

        if (!cotizacion) return res.status(404).json({ error: "No existe la cotizacion" });

        if(cliente) cotizacion.cliente = cliente;
        if(solicitante) cotizacion.solicitante = solicitante;
        if(email) cotizacion.email = email;
        if(fono) cotizacion.fono = fono;
        if(solicitud) cotizacion.solicitud = solicitud;
        if(marca) cotizacion.marca = marca;
        if(modelo) cotizacion.modelo = modelo;
        if(pn) cotizacion.pn = pn;
        if(qty) cotizacion.qty = qty;
        if(origen) cotizacion.origen = origen;
        if(iso) cotizacion.iso = iso;
        if(oc) cotizacion.oc = oc;
        if(order_confir) cotizacion.order_confir = order_confir;
        if(p_unitario_venta) cotizacion.p_unitario_venta = p_unitario_venta;
        if(p_total_venta) cotizacion.p_total_venta = p_total_venta;
        if(entregada) cotizacion.entregada = entregada;
        if(entregada1) cotizacion.entregada1 = entregada1;
        if(entregada2) cotizacion.entregada2 = entregada2;
        if(guiad) cotizacion.guiad = guiad;
        if(factura) cotizacion.factura = factura;
        if(num_credito) cotizacion.num_credito = num_credito;
        if(nva_factura) cotizacion.nva_factura = nva_factura;
        if(estado) cotizacion.estado = estado;

        await cotizacion.save();

        return res.json({ cotizacion });
    } catch (error) {
        console.log(error);
        if (error.kind === "ObjectId") {
            return res.status(403).json({ error: "Formato id incorrecto" });
        }
        return res.status(500).json({ error: "error de servidor" });
    }
};