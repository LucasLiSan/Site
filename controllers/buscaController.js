//CONTROLER PARA BUSCAS

import express from "express";
import bcrypt from "bcrypt";
import session from "express-session";
/* ---------- TABLES ---------- */
import Turistas from "../models/turistas.js";
import PontosTuristicos from "../models/pontos.js";
import Cidades from "../models/cidades.js";
/* ---------- TABLES ---------- */
const router = express.Router();

router.get('/busca', function(req, res) {
    const user = req.session.userCidade || req.session.userGuia || req.session.userTurista;
    const loggedOut = !user;
    PontosTuristicos.findAll().then(pontos => {
        res.render("busca", {
            pontos: pontos,
            loggedOut: loggedOut
        });
    });
});
export default router;