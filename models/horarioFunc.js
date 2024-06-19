import Sequelize from "sequelize";
import connection from "../config/sequelize-config.js";

const HorarioFuncionamento = connection.define('horarioFuncionas', 
{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    diaDaSemana: {
        type: Sequelize.STRING,
        allowNull: false
    },
    situacao: {
        type: Sequelize.STRING,
        allowNull: false
    },
    horaAbre: {
        type: Sequelize.TIME,
        allowNull: true
    },
    horaAlmocoIda: {
        type: Sequelize.TIME,
        allowNull: true
    },
    horaAlmocoVolta: {
        type: Sequelize.TIME,
        allowNull: true
    },
    horaFecha: {
        type: Sequelize.TIME,
        allowNull: true
    }
});

HorarioFuncionamento.sync({force:false});
export default HorarioFuncionamento;