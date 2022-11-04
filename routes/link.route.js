import { Router } from "express";
import { createLink, getLinks } from "../controllers/link.controller.js";
import { requireToken } from "../middlewares/requireToken.js";

const router = Router();


// GET              /api/v1/links           all links
// GET              /api/v1/links/:id       single link
// POST             /api/v1/links           create link
// PATCH/PUT        /api/v1/links/:id       update link
// DELETE           /api/v1/links/:id       remove link

router.get("/", requireToken, getLinks);

router.post("/", requireToken, createLink)

export default router;