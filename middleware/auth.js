//MIDDLWARE PARA AUTENTICAÇÃO E CONTROLE DE ORIGEM-DESTINO ROTAS

import session from "express-session";

function Auth (req, res, next) {
    console.log("Middleware Auth: Verificando sessão..."); //DEBUG
    if(req.session.userCidade != undefined) {
        console.log("Usuário Cidade autenticado.");
        next();
    } else if (req.session.userGuia != undefined) {
        console.log("Usuário Guia autenticado.");
        next();
    } else if (req.session.userTurista != undefined) {
        console.log("Usuário Turista autenticado.");
        next();
    } else {
        console.log("Sessão inválida. Redirecionando para página de login...");
        const redirectTo = req.originalUrl;
        res.render("login", {
            loggedOut : true,
            redirectTo: redirectTo
        });
    }
}
export default Auth;