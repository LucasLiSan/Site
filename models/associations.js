import PontosTuristicos from "./pontos.js";
import GuiasDeTurismo from "./guias.js";
import Turistas from "./turistas.js";
import Cidades from "./cidades.js";
import FotosGuias from "./fotosGuias.js";
import FotosPontos from "./fotosPontos.js";
import HorarioFuncionamento from "./horarioFunc.js";
import Comodidades from "./comodidades.js";
import AvaliacoesPontos from "./feedbackPonto.js";
import AvaliacoesGuias from "./feedbackGuia.js";
import PontosAvaliacoes from "./pontoAvaliado.js";
import GuiasAvaliacoes from "./guiaAvaliado.js";
import CategoriasPontos from "./categoriaXponto.js";
import HorarioPonto from "./horarioXponto.js";
import ComodidadesPontos from "./comodidadesXponto.js";
import Atracoes from "./cidadesXpontos.js";

/* \/----- Associações para Avaliações de Pontos Turísticos -----\/ */
PontosTuristicos.hasMany(PontosAvaliacoes, { foreignKey: 'idPonto', as: 'avaliacoesRelacionadas' });
PontosAvaliacoes.belongsTo(PontosTuristicos, { foreignKey: 'idPonto', as: 'pontoRelacionado' });

PontosAvaliacoes.belongsTo(AvaliacoesPontos, { foreignKey: 'idAvaliacao', as: 'detalheAvaliacao' });
AvaliacoesPontos.hasMany(PontosAvaliacoes, { foreignKey: 'idAvaliacao', as: 'pontosAvaliados' });
/* /\----- Associações para Avaliações de Pontos Turísticos -----/\ */

/* \/----- Associações para Avaliações de Guias de Turismo -----\/ */
GuiasDeTurismo.hasMany(GuiasAvaliacoes, { foreignKey: 'idGuia' });
GuiasAvaliacoes.belongsTo(GuiasDeTurismo, { foreignKey: 'idGuia' });

AvaliacoesGuias.hasMany(GuiasAvaliacoes, { foreignKey: 'idAvaliacao' });
GuiasAvaliacoes.belongsTo(AvaliacoesGuias, { foreignKey: 'idAvaliacao' });
/* /\----- Associações para Avaliações de Guias de Turismo -----/\ */

/* \/--------- Associação das avaliações dos turistas ---------\/ */
Turistas.hasMany(AvaliacoesPontos, { foreignKey: 'idAvaliador' });
AvaliacoesPontos.belongsTo(Turistas, { foreignKey: 'idAvaliador' });

Turistas.hasMany(AvaliacoesGuias, { foreignKey: 'idAvaliador' });
AvaliacoesGuias.belongsTo(Turistas, { foreignKey: 'idAvaliador' });
/* /\--------- Associação das avaliações dos turistas ---------/\ */

/* \/--------- Associações para Fotos de Pontos Turísticos ---------\/ */
PontosTuristicos.hasMany(FotosPontos, { foreignKey: 'idPontoFotografado', as: 'fotosPontos' });
FotosPontos.belongsTo(PontosTuristicos, { foreignKey: 'idPontoFotografado', as: 'pontoFotografado' });

Turistas.hasMany(FotosPontos, { foreignKey: 'idFotografo' });
FotosPontos.belongsTo(Turistas, { foreignKey: 'idFotografo' });
/* /\--------- Associações para Fotos de Pontos Turísticos ---------/\ */

/* \/--------- Associações para Fotos de Guias de Turismo ---------\/ */
GuiasDeTurismo.hasMany(FotosGuias, { foreignKey: 'idGuiaFotografado' });
FotosGuias.belongsTo(GuiasDeTurismo, { foreignKey: 'idGuiaFotografado' });

Turistas.hasMany(FotosGuias, { foreignKey: 'idFotografo' });
FotosGuias.belongsTo(Turistas, { foreignKey: 'idFotografo' });
/* /\--------- Associações para Fotos de Guias de Turismo ---------/\ */

/* \/--------- Associações para Pontos turisticos e suas Categorias ---------\/ */
PontosTuristicos.belongsTo(CategoriasPontos, { foreignKey: 'modalidade', targetKey: 'id', as: 'categoria' });
/* /\--------- Associações para Pontos turisticos e suas Categorias ---------/\ */

/* \/--------- Associações para Pontos turisticos e seus Beneficios ---------\/ */
PontosTuristicos.belongsToMany(Comodidades, { 
    through: ComodidadesPontos,
    foreignKey: 'idPontoTuristico',
    otherKey: 'idComodidade',
    as: 'comodidades'
});

Comodidades.belongsToMany(PontosTuristicos, {
    through: ComodidadesPontos,
    foreignKey: 'idComodidade',
    otherKey: 'idPontoTuristico',
    as: 'pontosTuristicos'
});
/* /\--------- Associações para Pontos turisticos e seus Beneficios ---------/\ */

/* \/--------- Associações para Pontos turisticos e seus Horários ---------\/ */
PontosTuristicos.belongsToMany(HorarioFuncionamento, { through: HorarioPonto, foreignKey: 'idPontoTuristico', as: 'horarios' });
HorarioFuncionamento.belongsToMany(PontosTuristicos, { through: HorarioPonto, foreignKey: 'idHorario', as: 'pontos' });
/* /\--------- Associações para Pontos turisticos e seus Horários ---------/\ */

/* \/--------- Associações para Pontos turisticos com suas Cidades ---------\/ */
PontosTuristicos.belongsToMany(Cidades, { 
    through: Atracoes,
    foreignKey: 'idPonto',
    otherKey: 'idCidade',
    as: 'atracoes'
});

Cidades.belongsToMany(PontosTuristicos, {
    through: Atracoes,
    foreignKey: 'idCidade',
    otherKey: 'idPonto',
    as: 'atracoesCidade'
});
/* /\--------- Associações para Pontos turisticos com suas Cidades ---------/\ */