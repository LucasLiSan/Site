import Sequelize from "sequelize";
import connection from "../config/sequelize-config.js";
import Turistas from "./turistas.js";
import PontosTuristicos from "./pontos.js";

const FotosPontos = connection.define('fotosPontos', 
    {
        idFotografo: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: Turistas,
                key: 'id'
            }
        },
        idPontoFotografado: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: PontosTuristicos,
                key: 'id'
            }
        },
        fotos: {
            type: Sequelize.STRING,
            allowNull: false
        },
        dataFoto: {
            type: Sequelize.DATE,
            allowNull: false
        }
    }
);

FotosPontos.sync({force:false});
export default FotosPontos;