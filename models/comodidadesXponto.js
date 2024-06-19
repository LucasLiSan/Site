import Sequelize from "sequelize";
import connection from "../config/sequelize-config.js";
import Comodidades from "./comodidades.js";
import PontosTuristicos from "./pontos.js";

const ComodidadesPontos = connection.define('comodidadesXpontos',
{
    idComodidade: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Comodidades,
            key: 'id'
        }
    },
    idPontoTuristico: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: PontosTuristicos,
            key: 'id'
        }
    }
});

ComodidadesPontos.belongsTo(Comodidades, { foreignKey: 'idComodidade' });
ComodidadesPontos.belongsTo(PontosTuristicos, { foreignKey: 'idPontoTuristico' });

ComodidadesPontos.sync({ force: false });
export default ComodidadesPontos;