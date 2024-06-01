import express from "express";
import PontosTuristicos from "../models/pontos.js";
import session from "express-session";
import Cidades from "../models/cidades.js";
import Guias from "../models/guias.js";
import Auth from "../middleware/auth.js";

const router = express.Router();

//ROTA BUSCA RAPIDA CIDADES
router.get('/cidades', function(req, res) {
    const user = req.session.userCidade || req.session.userGuia || req.session.userTurista;
    const loggedOut = !user;
    PontosTuristicos.findAll().then(pontos => {
        res.render("cidades", {
            pontos: pontos,
            loggedOut: loggedOut
        });
    });
});

//ROTA BUSCA RAPIDA PONTOS
router.get('/pontos', Auth, function(req, res) {
    const user = req.session.userCidade || req.session.userGuia || req.session.userTurista;
    const loggedOut = !user;
    PontosTuristicos.findAll().then(pontos => {
        res.render("pontos", {
            pontos: pontos,
            loggedOut: loggedOut
        });
    });
});

//ROTA BUSCA RAPIDA GUIAS
router.get('/guias', Auth, function(req, res) {
    const user = req.session.userCidade || req.session.userGuia || req.session.userTurista;
    const loggedOut = !user;
    PontosTuristicos.findAll().then(pontos => {
        res.render("guias", {
            pontos: pontos,
            loggedOut: loggedOut
        });
    });
});

export default router;