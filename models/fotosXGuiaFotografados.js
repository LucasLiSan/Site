import Sequelize from "sequelize";
import connection from "../config/sequelize-config.js";
import GuiasDeTurismo from "./guias.js";
import Turistas from "./turistas.js";
import FotosGuias from "./fotosGuias.js";

const GuiasFotografados = connection.define('fotosXGuiaFotografados',
    {
        idFoto: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: FotosGuias,
                key: 'id'
            }
        },
        idTurista: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: Turistas,
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

GuiasFotografados.belongsTo(FotosGuias, { foreignKey: 'idFoto'});
GuiasFotografados.belongsTo(Turistas, { foreignKey: 'idTurista'});
GuiasFotografados.belongsTo(GuiasDeTurismo, { foreignKey: 'idGuia'});

GuiasFotografados.sync({force:false});
export default GuiasFotografados;