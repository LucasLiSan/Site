import express from "express";
import session from "express-session";
import Turistas from "../models/turistas.js";
import GuiasDeTurismo from "../models/guias.js";
import Cidades from "../models/cidades.js";
import PontosTuristicos from "../models/pontos.js";
import CategoriasPontos from "../models/categoriaXponto.js";
import Atracoes from "../models/atracoes.js";
import Auth from "../middleware/auth.js";
const router = express.Router();

function formatDate(date) {
    const d = new Date(date);
    const utcYear = d.getUTCFullYear();
    const utcMonth = String(d.getUTCMonth() + 1).padStart(2, '0');
    const utcDay = String(d.getUTCDate()).padStart(2, '0');
    return `${utcYear}-${utcMonth}-${utcDay}`;
}


router.get("/profileUser", (req, res) => {
    const user = req.session.userCidade || req.session.userGuia || req.session.userTurista;
    const loggedOut = !user;

    PontosTuristicos.findAll().then(pontosTuristicos => {
        res.render("profileUser", {
            session: req.session, // Passando a sessão para a view
            user: user,
            loggedOut: loggedOut,
            messages: req.flash(),
            PontosTuristicos: pontosTuristicos
        });
    }).catch(err => {
        console.error("Erro ao buscar Pontos Turisticos:", err);
        req.flash('danger', 'Erro ao carregar os pontos turísticos.');
        res.redirect("/");
    });
});

router.post("/profileUser/update/:id", (req, res) => {
    const user = req.body.user;
    if (user === "cidade") {
        const id = req.body.id;
        const nome = req.body.nome;
        const cnpj = req.body.cnpj;
        const orgResp = req.body.orgResp;
        const cnpjOrgResp = req.body.cnpjOrgResp;
        const rua = req.body.rua;
        const bairro = req.body.bairro;
        const numero = req.body.numero;
        Cidades.update(
            {
                nomeCidade : nome,
                cnpjCidade : cnpj,
                orgRespCidade : orgResp,
                cnpjOrgRespCidade : cnpjOrgResp,
                endRuaOrgRespCidade : rua,
                endBairroOrgRespCidade : bairro,
                endNumOrgRespCidade : numero
            },
            {where: {id : id}}
        ).then(() => {
            req.session.userCidade = {
                ...req.session.userCidade,
                nome : nome,
                cnpj : cnpj,
                orgResp : orgResp,
                cnpjOrgResp : cnpjOrgResp,
                rua : rua,
                bairro : bairro,
                numero : numero
            };
                req.flash('success', 'Perfil de Cidade atualizado com sucesso.');
                res.redirect("/profileUser");
        }).catch(err => {
            console.error("Erro ao atualizar Cidade:", err);
            req.flash('danger', 'Erro ao atualizar o perfil de Cidade.');
            res.redirect("/profileUser");
        });
    } else if (user === "guia") {
        const id = req.body.id;
        const nome = req.body.nome;
        const cadastro = req.body.cadastro;
        GuiasDeTurismo.update(
            {
                nomeGuia : nome,
                cadGuia : cadastro
            },
            {where: {id : id}}
        ).then(() => {
            req.session.userGuia = {
                ...req.session.userGuia,
                nome : nome,
                cadastro : cadastro
            };
                req.flash('success', 'Perfil de Guia atualizado com sucesso.');
                res.redirect("/profileUser");
        })
        .catch(err => {
            console.error("Erro ao atualizar Guia:", err);
            req.flash('danger', 'Erro ao atualizar o perfil de Guia.');
            res.redirect("/profileUser");
        });
    } else if (user === "turista") {
        const id = req.body.id;
        const nome = req.body.nome;
        const cpf = req.body.cpf;
        const nascimento = req.body.nascimento;
        const rua = req.body.rua;
        const bairro = req.body.bairro;
        const numero = req.body.numero;
        const cidade = req.body.cidade;
        const uf = req.body.uf;
        const formattedNascTurista = formatDate(nascimento);
        Turistas.update(
            {
                nomeTurista : nome,
                cpfTurista : cpf,
                nascTurista : formattedNascTurista,
                endRuaTurista : rua,
                endBairroTurista : bairro,
                endNumTurista : numero,
                endCidadeTurista : cidade,
                endUfTurista : uf
            },
            {where: {id : id}}
        ).then(() => {
            req.session.userTurista = {
                ...req.session.userTurista,
                nome: nome,
                cpf: cpf,
                nasc: formattedNascTurista,
                rua: rua,
                bairro: bairro,
                numero: numero,
                cidade: cidade,
                uf: uf
            };
            req.flash('success', 'Perfil de Turista atualizado com sucesso.');
            res.redirect("/profileUser");
        }).catch(err => {
                console.error("Erro ao atualizar Turista:", err);
                req.flash('danger', 'Erro ao atualizar o perfil de Turista.');
                res.redirect("/profileUser");
            });
    } else {
        req.flash('danger', 'Tipo de usuário inválido.');
        res.redirect("/profileUser");
    }
});

export default router;
