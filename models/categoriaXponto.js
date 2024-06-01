import Sequelize from "sequelize";
import connection from "../config/sequelize-config.js";

const CategoriasPontos = connection.define('categoriasXpontos', 
{
    modalidade: {
        type: Sequelize.STRING,
        allowNull: false
    },
    categoria: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

CategoriasPontos.sync({force:false});
export default CategoriasPontos;