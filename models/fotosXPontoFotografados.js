import Sequelize from "sequelize";
import connection from "../config/sequelize-config.js";
import Turistas from "./turistas.js";
import PontosTuristicos from "./pontos.js";
import FotosPontos from "./fotosPontos.js"

const PontosFotografados = connection.define('fotosXPontoFotografados',
    {
        idFoto: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: FotosPontos,
                key: 'id'
            }
        },
        idTurista: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: Turistas,
                key: 'id'
            }
        },
        idPonto: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: PontosTuristicos,
                key: 'id'
            }
        }
    }
);

PontosFotografados.belongsTo(FotosPontos, { foreignKey: 'idFoto'});
PontosFotografados.belongsTo(Turistas, { foreignKey: 'idTurista'});
PontosFotografados.belongsTo(PontosTuristicos, { foreignKey: 'idPonto'});

PontosFotografados.sync({force:false});
export default PontosFotografados;