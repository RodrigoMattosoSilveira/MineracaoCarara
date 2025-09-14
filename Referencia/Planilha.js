const REFERENCIA_GOOGLE_SHEET_ID = "1LJqg-R3ZNB-fC44QKKxjx8ubhHYzbPWEDCmPykHn-y8";
const CURRENCY_FREAKS_API_KEY = '50d10488069441ee9bcb078a6239e5c7'

const REFERENCIA_METODOS_PLANILHA_NOME = "Metodo";
const REFERENCIA_AREAS_PLANILHA_NOME = "Area";
const REFERENCIA_LOCAIS_PLANILHA_NOME = "Local";
const REFERENCIA_TAREFAS_PLANILHA_NOME = "Tarefa";	
const REFERENCIA_PERIODO_PLANILHA_NOME = "Periodo";	

const REFERENCIA_METODOS_GAMA_NOME = "Metodo";
const REFERENCIA_AREAS_GAMA_NOME = "Area";
const REFERENCIA_LOCAIS_GAMA_NOME = "Local";
const REFERENCIA_TAREFAS_GAMA_NOME = "Tarefa";	
const REFERENCIA_PERIODO_GAMA_NOME = "Periodo";	
const REFERENCIA_OURO_USD_ONCA_GAMA_NOME = 'OuroUsdOnca'
const REFERENCIA_OURO_BRL_GRAMA_GAMA_NOME = 'OuroBrlGrama'

const obterReferenciaGoogleSheet = () =>  SpreadsheetApp.openById(REFERENCIA_GOOGLE_SHEET_ID);
const obterReferenciaMetodosPlanilha = () => obterReferenciaPlanilha(REFERENCIA_METODOS_PLANILHA_NOME);
const obterReferenciaAreasPlanilha = () => obterReferenciaPlanilha(REFERENCIA_AREAS_PLANILHA_NOME);
const obterReferenciaLocaisPlanilha = () => obterReferenciaPlanilha(REFERENCIA_LOCAIS_PLANILHA_NOME);
const obterReferenciaTarefasPlanilha = () => obterReferenciaPlanilha(REFERENCIA_TAREFAS_PLANILHA_NOME);
const obterReferenciaPeriodosPlanilha = () => obterReferenciaPlanilha(REFERENCIA_PERIODO_PLANILHA_NOME);

function obterReferenciaGama(sheetName) {
  const referenciaSS = SpreadsheetApp.openById(REFERENCIA_GOOGLE_SHEET_ID);
  return referenciaSS.getRangeByName(sheetName);
}
const obterReferenciaMetodosGama = () => obterReferenciaGama(REFERENCIA_METODOS_GAMA_NOME);
const obterReferenciaAreasGama = () => obterReferenciaGama(REFERENCIA_AREAS_GAMA_NOME);
const obterReferenciaLocaisGama = () => obterReferenciaGama(REFERENCIA_LOCAIS_GAMA_NOME);
const obterReferenciaTarefasGama = () => obterReferenciaGama(REFERENCIA_TAREFAS_GAMA_NOME);
const obterReferenciaPeriodosGama = () => obterReferenciaGama(REFERENCIA_PERIODO_GAMA_NOME);

function obterReferenciaGamaVals(sheetName) {
  const gama = obterReferenciaGama(sheetName);
  return (gama !== null) ? gama.getValues().filter( elemento => elemento[0] !== '' && elemento[0] !== 'Nome') : [];
}
const obterReferenciaMetodosGamaVals = () => obterReferenciaGamaVals(REFERENCIA_METODOS_GAMA_NOME);
const obterReferenciaAreasGamaVals = () => obterReferenciaGamaVals(REFERENCIA_AREAS_GAMA_NOME);
const obterReferenciaLocaisGamaVals = () => obterReferenciaGamaVals(REFERENCIA_LOCAIS_GAMA_NOME);
const obterReferenciaTarefasGamaVals = () => obterReferenciaGamaVals(REFERENCIA_TAREFAS_GAMA_NOME);
const obterReferenciaPeriodosGamaVals = () => obterReferenciaGamaVals(REFERENCIA_PERIODO_GAMA_NOME);
const obterReferenciaOuroBrlGramaVal = () => obterReferenciaGamaVals(REFERENCIA_OURO_BRL_GRAMA_GAMA_NOME)[0][0];


function obterReferenciaPocos() {
  let pocos = []
  obterReferenciaGamaVals(REFERENCIA_LOCAIS_GAMA_NOME).forEach( elemento => elemento[0].startsWith('Poço_') ? pocos.push(elemento[0]) : null);
  return  pocos;
}
function obterReferenciaPeriodos() {
  let periodos = []
  obterReferenciaGamaVals(REFERENCIA_PERIODO_GAMA_NOME).forEach( elemento => periodos.push(elemento[0]));
  return  periodos;
}