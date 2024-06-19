import Sequelize from "sequelize";
import connection from "../config/sequelize-config.js";

const Turistas = connection.define('turistas', 
{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nomeTurista:{
        type: Sequelize.STRING,
        allowNull:false
    },
    cpfTurista:{
        type:Sequelize.STRING,
        allowNull: true
    },
    nascTurista:{
        type: Sequelize.STRING,
        allowNull:false
    },
    endRuaTurista:{
        type: Sequelize.STRING,
        allowNull:false
    },
    endBairroTurista:{
        type: Sequelize.STRING,
        allowNull:false
    },
    endNumTurista:{
        type: Sequelize.STRING,
        allowNull:false
    },
    endCidadeTurista:{
        type: Sequelize.STRING,
        allowNull:false
    },
    endUfTurista:{
        type: Sequelize.STRING,
        allowNull:false
    },
    endCepTurista:{
        type: Sequelize.STRING,
        allowNull:false
    },
    idiomaTurista:{
        type: Sequelize.STRING,
        allowNull:false
    },
    telTurista:{
        type: Sequelize.STRING,
        allowNull:false
    },
    emailTurista:{
        type: Sequelize.STRING,
        allowNull:false
    },
    passwordTurista:{
        type: Sequelize.STRING,
        allowNull:false
    },
    profilePicTurista:{
        type: Sequelize.STRING,
        allowNull:true
    }
});

Turistas.sync({force:false});

export default Turistas;