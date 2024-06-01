import Sequelize from "sequelize";
import connection from "../config/sequelize-config.js";

const Cidades = connection.define('cidades', 
{
    nomeCidade:{
        type: Sequelize.STRING,
        allowNull:false
    },
    ufCidade:{
        type: Sequelize.STRING,
        allowNull: false
    },
    cnpjCidade:{
        type: Sequelize.STRING,
        allowNull:true
    },
    orgRespCidade:{
        type: Sequelize.STRING,
        allowNull: false
    },
    cnpjOrgRespCidade:{
        type: Sequelize.STRING,
        allowNull: false
    },
    endRuaOrgRespCidade:{
        type: Sequelize.STRING,
        allowNull: false
    },
    endNumOrgRespCidade:{
        type: Sequelize.STRING,
        allowNull: false
    },
    endBairroOrgRespCidade:{
        type: Sequelize.STRING,
        allowNull: false
    },
    endCepOrgRespCidade:{
        type: Sequelize.STRING,
        allowNull: false
    },
    telOrgRespCidade:{
        type: Sequelize.STRING,
        allowNull: false
    },
    emailOrgRespCidade:{
        type: Sequelize.STRING,
        allowNull: false
    },
    passwordCidade:{
        type: Sequelize.STRING,
        allowNull: false
    },
    profilePicCidade:{
        type: Sequelize.STRING,
        allowNull:true
    }
});

Cidades.sync({force:false});

export default Cidades;