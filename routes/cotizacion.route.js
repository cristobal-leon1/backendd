import { Router } from "express";
import { createCotizacion, getCotizaciones, getCotizacion, removeCotizacion, updateCotizacion } from "../controllers/cotizacion.controller.js";
import { requireToken } from "../middlewares/requireToken.js";

const router = Router();


// GET              /api/v1/links                   all links
// GET              /api/v1/links/:nanoLink       single link
// POST             /api/v1/links                 create link
// PATCH/PUT        /api/v1/links/:nanoLink       update link
// DELETE           /api/v1/links/:nanoLink       remove link

router.get("/", requireToken, getCotizaciones);
router.get("/:meb",requireToken, getCotizacion);
router.post("/", requireToken, createCotizacion);
router.delete("/:meb", requireToken, removeCotizacion);
router.patch(
    "/:meb",
    requireToken,
    updateCotizacion
);

export default router;