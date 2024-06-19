import Sequelize from "sequelize";
import connection from "../config/sequelize-config.js";
import Turistas from "./turistas.js";
import GuiasDeTurismo from "./guias.js";

const FotosGuias = connection.define('fotosGuias', 
    {
        idFotografo: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: Turistas,
                key: 'id'
            }
        },
        idGuiaFotografado: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: GuiasDeTurismo,
                key: 'id'
            }
        },
        fotos: {
            type: Sequelize.STRING,
            allowNull: false
        },
        dataFoto: {
            type: Sequelize.DATE,
            allowNull: false
        }
    }
);

FotosGuias.sync({force:false});
export default FotosGuias;