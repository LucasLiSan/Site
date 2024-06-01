import session from "express-session";

function Auth (req, res, next) {
    console.log("Middleware Auth: Verificando sessão...");
    if(req.session.userCidade != undefined) {
        next();
    } else if (req.session.userGuia != undefined) {
        next();
    } else if (req.session.userTurista != undefined) {
        next();
    } else {
        console.log("Sessão inválida. Redirecionando para página de login...");
        res.render("login", {
            loggedOut : true
        });
    }
}

export default Auth;