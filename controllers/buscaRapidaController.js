/*
CONTROLLER PARA A BUSCA RÁPIDA - LISTAGEM
Não tem um uso prático e efetivo dessas rotas, foi feita por exigencia da disciplina de matemática.
*/

/* \/---------- MODULES ----------\/ */
import express from "express";
import session from "express-session";
import Auth from "../middleware/auth.js";
/* /\---------- MODULES ----------/\ */
/* \/---------- TABLES ----------\/ */
import Turistas from "../models/turistas.js";
import GuiasDeTurismo from "../models/guias.js";
import Cidades from "../models/cidades.js";
import PontosTuristicos from "../models/pontos.js";
import HorarioFuncionamento from "../models/horarioFunc.js";
import Atracoes from "../models/cidadesXpontos.js";
import CategoriasPontos from "../models/categoriaXponto.js";
import HorarioPonto from "../models/horarioXponto.js";
/* /\---------- TABLES ----------/\ */
const router = express.Router();

//ROTA BUSCA RAPIDA POR CIDADES
router.get('/cidades', function(req, res) {
    const user = req.session.userCidade || req.session.userGuia || req.session.userTurista;
    const loggedOut = !user;

    PontosTuristicos.findAll({
        include: {
            model: HorarioFuncionamento,
            as: 'horarios' // Alias para os horários de funcionamento
        }
    }).then(pontos => {
            res.render("cidades", {
                pontos: pontos,
                loggedOut: loggedOut
            });
        });
});

//ROTA BUSCA RAPIDA POR PONTOS
router.get('/pontos', function(req, res) {
    const user = req.session.userCidade || req.session.userGuia || req.session.userTurista;
    const loggedOut = !user;

    PontosTuristicos.findAll({
        include: {
            model: HorarioFuncionamento,
            as: 'horarios' // Alias para os horários de funcionamento
        }
    }).then(pontos => {
            res.render("pontos", {
                pontos: pontos,
                loggedOut: loggedOut
            });
        });
});

//ROTA BUSCA RAPIDA POR GUIAS
router.get('/guias', function(req, res) {
    const user = req.session.userCidade || req.session.userGuia || req.session.userTurista;
    const loggedOut = !user;
    GuiasDeTurismo.findAll().then(guias => {
        res.render("guias", {
            guias: guias,
            loggedOut: loggedOut
        });
    });
});
export default router;