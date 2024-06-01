import Sequelize from "sequelize";
import connection from "../config/sequelize-config.js";

const Atracoes = connection.define('cidadesXpontos', 
{
    idCidade: {
        type: Sequelize.INTEGER,
        allowNull:false
    },
    idPonto: {
        type: Sequelize.INTEGER,
        allowNull:false
    }
});

Atracoes.sync({force:false});
export default Atracoes;