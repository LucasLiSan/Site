import Sequelize from "sequelize";
import connection from "../config/sequelize-config.js";

const Comodidades = connection.define('comodidades',
{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    comodidade: {
        type: Sequelize.STRING,
        allowNull: false
    },
    tipoComodidade: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

Comodidades.sync({force:false});
export default Comodidades;