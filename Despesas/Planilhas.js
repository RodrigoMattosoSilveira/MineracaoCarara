// https://stackoverflow.com/questions/62175748/driveapp-error-were-sorry-a-server-error-occurred-please-wait-a-bit-and-try
const PESSOA_SPREADSHEET_ID   = CararaLibrary.GetSpreadsheetId(SpreadsheetApp.getActive(), "PESSOA");
const ESTADIA_SPREADSHEET_ID  = CararaLibrary.GetSpreadsheetId(SpreadsheetApp.getActive(), "ESTADIA")

const obterSpreadsheet         = (PlanilhaGoggleIdD) =>  SpreadsheetApp.openById(PlanilhaGoggleIdD);

const ESTADIAS_PLANILHA        = "Dados";
const ESTADIAS_GAMA            = "EstadiaGama";
const ESTADIAS_FIRST_ROw       = 2;
const ESTADIAS_NOME            = 0;
const ESTADIAS_INICIO          = 1;
const ESTADIAS_FIM             = 2;
const ESTADIAS_DISPONIBILIDADE = 3;
const ESTADIAS_METODO          = 4;
const ESTADIAS_SETOR           = 5;
const ESTADIAS_LOCAL           = 6;
const ESTADIAS_TAREFA          = 7;
const ESTADIAS_REMUNERACAO     = 8;
const ESTADIAS_COMENTARIOS     = 9;

const ESTADIAS_PLANILHA_TRABALHO_NOME                       = "Tabalho";
const ESTADIAS_PLANILHA_TRABALHO_METODO_NOME_COL            = 0
const ESTADIAS_PLANILHA_TRABALHO_METODO_DISPONIBILIDADE_COL = 1
const ESTADIAS_PLANILHA_TRABALHO_METODO_COL                 = 2
const ESTADIAS_PLANILHA_TRABALHO_SETOR_COL                  = 3
const ESTADIAS_PLANILHA_TRABALHO_TAREFA_COL                 = 4

const obterEstadiasPlanilha = () => obterSpreadsheet(ESTADIA_SPREADSHEET_ID).getSheetByName(ESTADIAS_PLANILHA);
const obterEstadiasGama     = () => obterSpreadsheet(ESTADIA_SPREADSHEET_ID).getRangeByName(ESTADIAS_GAMA);
const obterEstadiasGamaVals = () => {
	let  gama = obterEstadiasGama();
	return  (gama !== null) ? gama.getValues().filter( elemento => elemento[ESTADIAS_NOME] !== '' && elemento[ESTADIAS_NOME] !== 'Nome') : [];
}
let estadiaGamaVals = obterEstadiasGamaVals().sort((a, b) => {
	return a[ESTADIAS_NOME].localeCompare(b[ESTADIAS_NOME])
});;
const obterEstadiaGamaRegistroNome = (nome) => {
	return estadiaGamaVals.find((element) => element[ESTADIAS_NOME] == nome)
}
const obterEstadiasGamaNomeVals = () => {
	let  gama = obterEstadiasGama();
	return  (gama !== null) ? gama.getValues().map( elemento => elemento[ESTADIAS_NOME]) : [];
}
const obterEstadiasGamaNomeValsSansNome = (nome) => {
  let vals = obterEstadiasGamaVals();
  const nomes = [];
  vals.forEach(elemento => {
    elemento[ESTADIAS_NOME].localeCompare(nome) !== 0 ? nomes.push([elemento[ESTADIAS_NOME]]) : null; 
  })
	return  nomes;
}

const DESPESAS_TRABALHO_NOME   = 0;
const DESPESAS_TRABALHO_INICIO = 1;
const DESPESAS_TRABALHO_METODO = 2;

const CANTINA_ITEM = 0;
const CANTINA_REAL = 1;
const CANTINA_OURO = 2;

const DESPESAS_TRABALHO_ITEM = 5;
const DESPESAS_TRABALHO_REAL = 6;
const DESPESAS_TRABALHO_OURO = 7;

/**
 * Referencia
 */
const REFERENCIA_SS_ID = CararaLibrary.GetSpreadsheetId(SpreadsheetApp.getActive(), "REFERENCIA");

const REFERENCIA_OURO_BRL_GRAMA_GAMA_NOME = 'OuroBrlGrama'

function obterReferenciaGama(nomeGama) {
  const referenciaSS = SpreadsheetApp.openById(REFERENCIA_SS_ID);
  return referenciaSS.getRangeByName(nomeGama);
}

function obterReferenciaGamaVals(rangeName) {
  const gama = obterReferenciaGama(rangeName);
  const vals = gama.getValues();
  return (gama !== null) ? vals.filter( elemento => elemento[0] !== '' && elemento[0] !== 'Nome') : [];
}
function obterReferenciaGamaVal(rangeName) {
  const gama = obterReferenciaGama(rangeName);
  const val = gama.getValue();
  return val;
}

function obterReferenciaOuroBrlGramaVal () { 
	return obterReferenciaGamaVal(REFERENCIA_OURO_BRL_GRAMA_GAMA_NOME)
};
