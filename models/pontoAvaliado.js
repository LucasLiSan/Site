import Sequelize from "sequelize";
import connection from "../config/sequelize-config.js";
import AvaliacoesPontos from "./feedbackPonto.js";
import PontosTuristicos from "./pontos.js";

const PontosAvaliacoes = connection.define('pontosAvaliados', 
    {
        idAvaliacao: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: AvaliacoesPontos,
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

PontosAvaliacoes.belongsTo(AvaliacoesPontos, { foreignKey: 'idAvaliacao', as: 'avaliacaoDetalhe' });
AvaliacoesPontos.hasMany(PontosAvaliacoes, { foreignKey: 'idAvaliacao', as: 'avaliacoesDePonto' });

PontosAvaliacoes.sync({force:false});
export default PontosAvaliacoes;
