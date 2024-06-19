import Sequelize from "sequelize";
import connection from "../config/sequelize-config.js";
import Cidades from "./cidades.js";
import PontosTuristicos from "./pontos.js";

const Atracoes = connection.define('cidadesXpontos', 
{
    idCidade: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references: {
            model: Cidades,
            key: 'id'
        }
    },
    idPonto: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references: {
            model: PontosTuristicos,
            key: 'id'
        }
    }
});

Atracoes.belongsTo(Cidades, { foreignKey: 'idCidade', as: 'atracoesCidade' });
Atracoes.belongsTo(PontosTuristicos, { foreignKey: 'idPonto', as: 'atracoes' });

Atracoes.sync({force:false});
export default Atracoes;