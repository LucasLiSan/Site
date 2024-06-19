import Sequelize from "sequelize";
import connection from "../config/sequelize-config.js";

const GuiasDeTurismo = connection.define('guias', 
{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nomeGuia:{
        type: Sequelize.STRING,
        allowNull:false
    },
    cadGuia:{
        type: Sequelize.STRING,
        allowNull:false
    },
    motorGuia:{
        type: Sequelize.STRING,
        allowNull:false
    },
    idiomaGuia:{
        type: Sequelize.STRING,
        allowNull:false
    },
    emailGuia:{
        type: Sequelize.STRING,
        allowNull:false
    },
    passwordGuia:{
        type: Sequelize.STRING,
        allowNull:false
    },
    profilePicGuia:{
        type: Sequelize.STRING,
        allowNull:true
    }
});

GuiasDeTurismo.sync({force:false});

export default GuiasDeTurismo;