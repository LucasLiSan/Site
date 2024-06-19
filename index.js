//https://codepen.io/jpdevries/pen/MoROzK?editors=1000

//IMPORTANDO OS MODULOS
import express from "express";
import connection from "./config/sequelize-config.js";
import session from "express-session";
import flash from "express-flash";
import multer from "multer";
import path from "path";

//INICIANDO O EXPRESS
const app = express();

app.use((req, res, next) => {
    //console.log("Middleware: Tornando a sessão disponível em todas as views...");
    res.locals.session = req.session;
    next();
});

//CRIANDO AS CONEXÕES E CRIANDO O BANCO
connection.authenticate().then(() => {
    console.log("Conexão com o banco realizada com sucesso!")
}).catch((error) => {
    console.log(error)
});
connection.query(`CREATE DATABASE IF NOT EXISTS travelingMonkey;`).then(() => {
    console.log("Banco de dados criado!")
}).catch((error) => {
    console.log(error)
});

//DEFINIÇÕES BÁSICAS
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(flash());
app.use(session({
    secret: "Iwazaru",
    cookie: {maxAge: 86400000},
    saveUninitialized: false,
    resave: false
}));

//DEFININDO LOCAL DE ARMAZENAMENTO
const storage = multer.diskStorage({
    destination: function (req, file, cb) { cb(null, 'public/imgs/uploads'); },
    filename: function (req, file, cb) { cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); }
});
const upload = multer({ storage: storage });

//IMPORTANDO OS CONTROLLERS E DEFININDO O USO DAS ROTAS
import buscaController from "./controllers/buscaController.js";
import buscaRapidaController from "./controllers/buscaRapidaController.js";
import pontosController from "./controllers/pontosController.js"
import profileController from "./controllers/profileController.js";
import reservasController from "./controllers/reservasController.js";
import usersController from "./controllers/usersController.js";

app.use("/", buscaController);
app.use("/", buscaRapidaController);
app.use("/", pontosController);
app.use("/", profileController);
app.use("/", reservasController);
app.use("/", usersController);

//ROTA PRINCIPAL
app.get("/home", function(req,res){
    const user = req.session.userCidade || req.session.userGuia || req.session.userTurista;
    const loggedOut = !user;
    res.render("index", {
        loggedOut: loggedOut
    });
});

//INICIANDO O SERVIDOR
app.listen(8080, function(erro){
    if(erro){
        console.log("Ocorreu um erro!")
    } else {
        console.log("Servidor iniciado com sucesso!")
    }
});