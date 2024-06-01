import express from "express";
import session from "express-session";
import bcrypt from "bcrypt";
import Cidades from "../models/cidades.js";
import PontosTuristicos from "../models/pontos.js";
import Atracoes from "../models/atracoes.js";
import Auth from "../middleware/auth.js";
const router = express.Router();

router.post("/profileUser/ponto/new", (req, res) => {
    const nome = req.body.nome
    const cpf = req.body.cpf
    const endereco = req.body.endereco
    PontosTuristicos.create({
        nome : nome,
        cpf : cpf,
        endereco : endereco
    }).then(() => {
        res.redirect("/profileUser")
    })
})

// ROTA DE EXCLUSÃO DE PONTOS TURISTICOS
router.get("/profileUser/ponto/delete/:id", (req, res) => {
    const id = req.params.id
    PontosTuristicos.destroy({
        where: {
            id : id
        }
    }).then(() => {
        res.redirect("/profileUser")
    })
})

// ROTA DE ALTERAÇÃO DE PONTOS TURISTICOS
router.post("/profileUser/ponto/update/:id", (req, res) => {
    const id = req.body.id
    const nome = req.body.nome
    const cpf = req.body.cpf
    const endereco = req.body.endereco
    PontosTuristicos.update(
        {
            nome : nome,
            cpf : cpf,
            endereco : endereco
        },
        {where: {id : id}}
    ).then(() => {
        res.redirect("/profileUser")
    })
})

export default router;