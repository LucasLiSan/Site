import Sequelize from "sequelize";
import connection from "../config/sequelize-config.js";
import AvaliacoesGuias from "./feedbackGuia.js";
import GuiasDeTurismo from "./guias.js";

const GuiasAvaliacoes = connection.define('guiasAvaliados', 
{
    idAvaliacao: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: AvaliacoesGuias,
            key: 'id'
        }
    },
    idGuia: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: GuiasDeTurismo,
            key: 'id'
        }
    }
}
);

GuiasAvaliacoes.belongsTo(AvaliacoesGuias, { foreignKey: 'idAvaliacao' });
GuiasAvaliacoes.belongsTo(GuiasDeTurismo, { foreignKey: 'idGuia' });

GuiasAvaliacoes.sync({force:false});
export default GuiasAvaliacoes;
