import express from "express";
import session from "express-session";
import bcrypt from "bcrypt";
import Turistas from "../models/turistas.js";
import GuiasDeTurismo from "../models/guias.js";
import Cidades from "../models/cidades.js";
import PontosTuristicos from "../models/pontos.js";
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

function calculateAge(dateOfBirth) {
    const birthDate = new Date(dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

//ROTA LOGIN
router.get('/login', function(req,res){
    const user = req.session.userCidade || req.session.userGuia || req.session.userTurista;
    const loggedOut = !user;
        res.render("login", {
            session: req.session, // Passando a sessão para a view
            user: user,
            loggedOut: loggedOut,
            messages: req.flash()
        });
});

//ROTA CADASTRO
router.get("/cadastro", (req,res) => {
    res.render("cadastro", {
        loggedOut: true,
        messages: req.flash()
    });
});

// ROTA DE CRIAÇÃO DE USUÁRIO NO BANCO
router.post("/createUser", (req, res) => {
    const profile = req.body.profile;
    console.log("Profile:", profile);

    const defaultProfilePicA = "/imgs/iwazaru.webp"; // Imagem padrão1
    const defaultProfilePicB = "/imgs/kikazaru.webp"; // Imagem padrão2
    const defaultProfilePicC = "/imgs/mizaru.webp"; // Imagem padrão3

    if (profile === 'cidade') {
        const {
            nomeCidade, ufCidade, cnpjCidade, orgRespCidade, cnpjOrgRespCidade,
            endRuaOrgRespCidade, endNumOrgRespCidade, endBairroOrgRespCidade, endCepOrgRespCidade,
            telOrgRespCidade, emailOrgRespCidade, passwordCidade
        } = req.body;
        console.log("Cidade:", emailOrgRespCidade);

        Cidades.findOne({ where: { emailOrgRespCidade: emailOrgRespCidade } }).then(cidades => {
            console.log("Cidade encontrada:", cidades);
            if (cidades === null) {
                const saltCidade = bcrypt.genSaltSync(10);
                const hashCidade = bcrypt.hashSync(passwordCidade, saltCidade);
                Cidades.create({
                    nomeCidade, ufCidade, cnpjCidade, orgRespCidade, cnpjOrgRespCidade,
                    endRuaOrgRespCidade, endNumOrgRespCidade, endBairroOrgRespCidade, endCepOrgRespCidade,
                    telOrgRespCidade, emailOrgRespCidade, passwordCidade: hashCidade,profilePicCidade: defaultProfilePicA
                }).then(() => {
                    req.flash('success', 'Usuário cadastrado.');
                    res.redirect("/login");
                });
            } else {
                req.flash('danger', 'Usuário já cadastrado.');
                res.redirect("/login");
            }
        }).catch(error => {
            console.error("Erro ao buscar cidade:", error);
            res.status(500).send("Erro no servidor");
        });

    } else if (profile === 'guia') {
        const {
            nomeGuia, cadGuia, motorGuia, idiomaGuia, emailGuia, passwordGuia
        } = req.body;
        console.log("Guia:", emailGuia);

        GuiasDeTurismo.findOne({ where: { emailGuia: emailGuia } }).then(guias => {
            console.log("Guia encontrado:", guias);
            if (guias === null) {
                const saltGuia = bcrypt.genSaltSync(10);
                const hashGuia = bcrypt.hashSync(passwordGuia, saltGuia);
                GuiasDeTurismo.create({
                    nomeGuia, cadGuia, motorGuia, idiomaGuia, emailGuia, passwordGuia: hashGuia, profilePicGuia: defaultProfilePicB
                }).then(() => {
                    req.flash('success', 'Usuário cadastrado.');
                    res.redirect("/login");
                });
            } else {
                req.flash('danger', 'Usuário já cadastrado.');
                res.redirect("/login");
            }
        }).catch(error => {
            console.error("Erro ao buscar guia:", error);
            res.status(500).send("Erro no servidor");
        });

    } else if (profile === 'turista') {
        const {
            nomeTurista, cpfTurista, nascTurista, endRuaTurista, endBairroTurista, endNumTurista, endCidadeTurista, endUfTurista, endCepTurista, idiomaTurista, telTurista, emailTurista, passwordTurista
        } = req.body;
        const formattedNascTurista = formatDate(nascTurista);
        console.log("Turista:", emailTurista);

        Turistas.findOne({ where: { emailTurista: emailTurista } }).then(user => {
            console.log("Turista encontrado:", user);
            if (user === null) {
                const saltTurista = bcrypt.genSaltSync(10);
                const hashTurista = bcrypt.hashSync(passwordTurista, saltTurista);
                Turistas.create({
                    nomeTurista, cpfTurista, nascTurista: formattedNascTurista, endRuaTurista, endBairroTurista, endNumTurista, endCidadeTurista, endUfTurista, endCepTurista, idiomaTurista, telTurista, emailTurista, passwordTurista: hashTurista, profilePicTurista: defaultProfilePicC
                }).then(() => {
                    req.flash('success', 'Usuário cadastrado.');
                    res.redirect("/login");
                });
            } else {
                req.flash('danger', 'Usuário já cadastrado.');
                res.redirect("/login");
            }
        }).catch(error => {
            console.error("Erro ao buscar turista:", error);
            res.status(500).send("Erro no servidor");
        });

    } else {
        res.status(400).send('Tipo de cadastro inválido');
    }
});

//ROTA AUTENTICAÇÃO
router.post("/auth", (req, res) => {
    const profile = req.body.user;
    const LoginEmail = req.body.email;
    const LoginPassword = req.body.password;

    //BUSCA NO BANCO ESPECIFICO
    if (profile ==="Cidade"){
        Cidades.findOne({where: {emailOrgRespCidade : LoginEmail}}).then(userCidade => {
            // SE O USUÁRIO EXISTIR
            if (userCidade != undefined) { 
              // VALIDA A SENHA
              const correct = bcrypt.compareSync(LoginPassword, userCidade.passwordCidade);
              // SE A SENHA FOR VÁLIDA
              if(correct){
                // AUTORIZA O LOGIN - CRIAREMOS A SESSAO DO USUARIO
                req.session.userCidade = {
                  id : userCidade.id,
                  nome : userCidade.nomeCidade,
                  cnpj : userCidade.cnpjCidade,
                  orgResp : userCidade.orgRespCidade,
                  cnpjOrgResp : userCidade.cnpjOrgRespCidade,
                  rua : userCidade.endRuaOrgRespCidade,
                  numero : userCidade.endNumOrgRespCidade,
                  bairro : userCidade.endBairroOrgRespCidade,
                  uf : userCidade.ufCidade,
                  telefone : userCidade.telOrgRespCidade,
                  email : userCidade.emailOrgRespCidade,
                  pic: userCidade.profilePicCidade
                }
                req.flash('success', `Login efetuado com suceeso! Bem-Vindo ${req.session.userCidade['nome']}`);
                res.redirect("/profileUser");
              // SE A SENHA NÃO FOR VÁLIDA
              } else {
                // EXIBE A MENSAGEM
                req.flash('danger', 'Senha incorreta! Tente novamente.');
                res.redirect("/login");
              }
            }
        });
    } else if (profile === "Guia") {
        GuiasDeTurismo.findOne({where: {emailGuia : LoginEmail}}).then(userGuia => {
            // SE O USUÁRIO EXISTIR
            if (userGuia != undefined) { 
              // VALIDA A SENHA
              const correct = bcrypt.compareSync(LoginPassword, userGuia.passwordGuia);
              // SE A SENHA FOR VÁLIDA
              if(correct){
                // AUTORIZA O LOGIN - CRIAREMOS A SESSAO DO USUARIO
                req.session.userGuia = {
                  id : userGuia.id,
                  email : userGuia.emailGuia,
                  cadastro : userGuia.cadGuia,
                  motorista : userGuia.motorGuia,
                  language : userGuia.idiomaGuia,
                  nome : userGuia.nomeGuia,
                  pic: userGuia.profilePicGuia
                }
                req.flash('success', `Login efetuado com suceeso! Bem-Vindo ${req.session.userGuia['nome']}`);
                res.redirect("/profileUser");
              // SE A SENHA NÃO FOR VÁLIDA
              } else {
                // EXIBE A MENSAGEM
                req.flash('danger', 'Senha incorreta! Tente novamente.');
                res.redirect("/login");
              }
            }
        });
    } else if (profile === "Turista") {
        Turistas.findOne({where: {emailTurista : LoginEmail}}).then(userTurista => {
            // SE O USUÁRIO EXISTIR
            if (userTurista != undefined) { 
              // VALIDA A SENHA
              const correct = bcrypt.compareSync(LoginPassword, userTurista.passwordTurista);
              // SE A SENHA FOR VÁLIDA
              if(correct){
                // AUTORIZA O LOGIN - CRIAREMOS A SESSAO DO USUARIO
                const formattedNascTurista = formatDate(userTurista.nascTurista);
                req.session.userTurista = {
                  id : userTurista.id,
                  nome : userTurista.nomeTurista,
                  email : userTurista.emailTurista,
                  foneP : userTurista.telTurista,
                  cpf : userTurista.cpfTurista,
                  nasc : formattedNascTurista,
                  age: calculateAge(userTurista.nascTurista),
                  rua : userTurista.endRuaTurista,
                  bairro : userTurista.endBairroTurista,
                  numero : userTurista.endNumTurista,
                  cidade : userTurista.endCidadeTurista,
                  uf : userTurista.endUfTurista,
                  language : userTurista.idiomaTurista,
                  pic: userTurista.profilePicTurista
                }
                req.flash('success', `Login efetuado com suceeso! Bem-Vindo ${req.session.userTurista['nome']}`);
                res.redirect("/profileUser");
              // SE A SENHA NÃO FOR VÁLIDA
              } else {
                // EXIBE A MENSAGEM
                req.flash('danger', 'Senha incorreta! Tente novamente.');
                res.redirect("/login");
              }
            }
        });
    //SE O USUARIO NÃO EXISTIR
    } else {
        // EXIBE A MENSAGEM
        req.flash('danger', 'Usuario não cadastrado!')
        res.redirect("/login")
    }
});
  
//ROTA LOGOUT
router.get("/logout", (req, res) => {
    req.session.userCidade = undefined
    req.session.userGuia = undefined
    req.session.userTurista = undefined
    req.flash('danger', 'Logout completo!');
    res.redirect("/home");
});
  
  export default router;