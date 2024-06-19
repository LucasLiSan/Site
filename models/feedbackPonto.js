import Sequelize from "sequelize";
import connection from "../config/sequelize-config.js";
import Turistas from "./turistas.js";
import PontosTuristicos from "./pontos.js";

const AvaliacoesPontos = connection.define('avaliacoesPontos', 
    {
        idAvaliador: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: Turistas,
                key: 'id'
            }
        },
        idPontoAvaliado: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: PontosTuristicos,
                key: 'id'
            }
        },
        nota: {
            type: Sequelize.DECIMAL(2,1),
            allowNull: false
        },
        comentario: {
            type: Sequelize.STRING,
            allowNull: true
        },
        dataAvaliacao: {
            type: Sequelize.DATE,
            allowNull: false
        }
    }
);

AvaliacoesPontos.belongsTo(Turistas, { foreignKey: 'idAvaliador' });
AvaliacoesPontos.belongsTo(PontosTuristicos, { foreignKey: 'idPontoAvaliado' });

AvaliacoesPontos.sync({force:false});
export default AvaliacoesPontos;
