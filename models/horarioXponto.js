import Sequelize from "sequelize";
import connection from "../config/sequelize-config.js";
import HorarioFuncionamento from "./horarioFunc.js";
import PontosTuristicos from "./pontos.js";

const HorarioPonto = connection.define('horarioXpontos', 
{
    idHorario: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: HorarioFuncionamento,
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

HorarioPonto.belongsTo(HorarioFuncionamento, { foreignKey: 'idHorario' });
HorarioPonto.belongsTo(PontosTuristicos, { foreignKey: 'idPontoTuristico' });

HorarioPonto.sync({ force: false });
export default HorarioPonto;