const REFERENCIA_GOOGLE_SHEET_ID = GetSpreadsheetId(SpreadsheetApp.getActive(), "REFERENCIA");
const CURRENCY_FREAKS_API_KEY = '50d10488069441ee9bcb078a6239e5c7'

const REFERENCIA_METODOS_PLANILHA_NOME   = "Metodo";
const REFERENCIA_SETORES_PLANILHA_NOME    = "Setor";
const REFERENCIA_LOCAIS_PLANILHA_NOME   = "Local";
const REFERENCIA_TAREFAS_PLANILHA_NOME  = "Tarefa";	
const REFERENCIA_PERIODO_PLANILHA_NOME  = "Periodo";	

const REFERENCIA_METODOS_GAMA_NOME        = "Metodo";
const REFERENCIA_SETORES_GAMA_NOME        = "Setor";
const REFERENCIA_LOCAIS_GAMA_NOME         = "Local";
const REFERENCIA_TAREFAS_GAMA_NOME        = "Tarefa";	
const REFERENCIA_PERIODO_GAMA_NOME        = "PeriodosValidos";	
const REFERENCIA_OURO_USD_ONCA_GAMA_NOME  = 'OuroUsdOnca'
const REFERENCIA_OURO_BRL_GRAMA_GAMA_NOME = 'OuroBrlGrama'
const REFERENCIA_OURO_BRL_GRAMA_GAMA_OURO_MINAS = 'OuroBrlGramaOuroMinas'

const REFERENCIA_PERIODO_NOME_COL     = 0;
const REFERENCIA_PERIODO_ID_COL       = 1;
const REFERENCIA_PERIODO_HORA_COL     = 2;

const obterReferenciaGoogleSheet      = ()  =>  SpreadsheetApp.openById(REFERENCIA_GOOGLE_SHEET_ID);
const obterReferenciaMetodosPlanilha  = ()  => obterReferenciaPlanilha(REFERENCIA_METODOS_PLANILHA_NOME);
const obterReferenciaSetorersPlanilha = ()  => obterReferenciaPlanilha(REFERENCIA_SETORES_PLANILHA_NOME);
const obterReferenciaLocaisPlanilha   = ()  => obterReferenciaPlanilha(REFERENCIA_LOCAIS_PLANILHA_NOME);
const obterReferenciaTarefasPlanilha  = ()  => obterReferenciaPlanilha(REFERENCIA_TAREFAS_PLANILHA_NOME);
const obterReferenciaPeriodosPlanilha = ()  => obterReferenciaPlanilha(REFERENCIA_PERIODO_PLANILHA_NOME);

function obterReferenciaGama(nomeGama) {
  const referenciaSS = SpreadsheetApp.openById(REFERENCIA_GOOGLE_SHEET_ID);
  return referenciaSS.getRangeByName(nomeGama);
}
const obterReferenciaMetodosGama  = () => obterReferenciaGama(REFERENCIA_METODOS_GAMA_NOME);
const obterReferenciaSetoresGama  = () => obterReferenciaGama(REFERENCIA_SETORES_GAMA_NOME);
const obterReferenciaLocaisGama   = () => obterReferenciaGama(REFERENCIA_LOCAIS_GAMA_NOME);
const obterReferenciaTarefasGama  = () => obterReferenciaGama(REFERENCIA_TAREFAS_GAMA_NOME);
const obterReferenciaPeriodosGama = () => obterReferenciaGama(REFERENCIA_PERIODO_GAMA_NOME);
const obterReferenciaOuroBrlGama  = () => obterReferenciaGama(REFERENCIA_OURO_BRL_GRAMA_GAMA_NOME);
const obterReferenciaOuroBrlOuroMinasGama  = () => obterReferenciaGama(REFERENCIA_OURO_BRL_GRAMA_GAMA_OURO_MINAS);

function obterReferenciaGamaVals(rangeName) {
  const gama = obterReferenciaGama(rangeName);
  const vals = gama.getValues();
  return (gama !== null) ? vals.filter( elemento => elemento[0] !== '' && elemento[0] !== 'Nome') : [];
}
function obterReferenciaGamaVal(rangeName) {
  const gama = obterReferenciaGama(rangeName);
  const val = gama.getValue();
  return val;
;
}
const obterReferenciaMetodosGamaVals  = () => obterReferenciaGamaVals(REFERENCIA_METODOS_GAMA_NOME);
const obterReferenciaSetoresGamaVals  = () => obterReferenciaGamaVals(REFERENCIA_SETORES_GAMA_NOME);
const obterReferenciaLocaisGamaVals   = () => obterReferenciaGamaVals(REFERENCIA_LOCAIS_GAMA_NOME);
const obterReferenciaTarefasGamaVals  = () => obterReferenciaGamaVals(REFERENCIA_TAREFAS_GAMA_NOME);
const obterReferenciaPeriodosGamaVals = () => obterReferenciaGamaVals(REFERENCIA_PERIODO_GAMA_NOME);
function obterReferenciaOuroBrlGramaVal () { return obterReferenciaGamaVal(REFERENCIA_OURO_BRL_GRAMA_GAMA_NOME)};


function obterReferenciaPocos() {
  let pocos = []
  obterReferenciaGamaVals(REFERENCIA_LOCAIS_GAMA_NOME).forEach( elemento => elemento[0].startsWith('Poço_') ? pocos.push(elemento[0]) : null);
  return  pocos;
}
/**
 * 
 * @returns {Array} periodos
 */
function obterReferenciaPeriodos() {
  let periodos = []
  obterReferenciaGamaVals(REFERENCIA_PERIODO_GAMA_NOME).forEach( elemento => periodos.push(elemento[0]));
  return  periodos;
}
/**
 * 
 * @returns {Object} mapa dos periodos de trabalho na organizacao
 */
function obterPeriodos() {
  let periodos = new Map();
  let periodosGamaVals = obterReferenciaPeriodosGamaVals();
  periodosGamaVals.forEach(element => { 
    periodos.set(element[REFERENCIA_PERIODO_NOME_COL], {'ID': element[REFERENCIA_PERIODO_ID_COL], 'Hora': element[REFERENCIA_PERIODO_HORA_COL],});
  });
  return periodos;
}
