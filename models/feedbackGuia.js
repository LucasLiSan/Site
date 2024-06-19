import Sequelize from "sequelize";
import connection from "../config/sequelize-config.js";
import Turistas from "./turistas.js";
import GuiasDeTurismo from "./guias.js";

const AvaliacoesGuias = connection.define('avaliacoesGuias', 
    {
        idAvaliador: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: Turistas,
                key: 'id'
            }
        },
        idGuiaAvaliado: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: GuiasDeTurismo,
                key: 'id'
            }
        },
        nota: {
            type: Sequelize.INTEGER,
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

AvaliacoesGuias.belongsTo(Turistas, { foreignKey: 'idAvaliador' });
AvaliacoesGuias.belongsTo(GuiasDeTurismo, { foreignKey: 'idGuiaAvaliado' });

AvaliacoesGuias.sync({force:false});
export default AvaliacoesGuias;
