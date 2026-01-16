const ESTADIAS_PLANILHA     = "Estadias";
const ESTADIAS_GAMA         = "EstadiaGama";
const ESTADIAS_NOME         = 0;
const ESTADIAS_INICIO       = 1;
const ESTADIAS_METODO       = 2;
const ESTADIAS_SETOR        = 3;
const ESTADIAS_LOCAL        = 4;
const ESTADIAS_TAREFA       = 5;
const ESTADIAS_REMUNERACAO  = 6;
const ESTADIAS_COMENTARIOS  = 7;

function obterEstadiasPlanilha () { SpreadsheetApp.openById(ESTADIAS_ID); }
function obterEstadiasGama () { obterEstadiasPlanilha().getRangeByName(ESTADIAS_GAMA); }
function obterEstadiasGamaVals () {
	let  gama = obterEstadiasGama();
	return  (gama !== null) ? gama.getValues().filter( elemento => elemento[ESTADIAS_NOME] !== '' && elemento[ESTADIAS_NOME] !== 'Nome') : [];
}
function obterEstadiaGamaRegistroNome(nome) {
	let estadiaGamaVals = obterEstadiasGamaVals()
	return estadiaGamaVals.find((element) => element[ESTADIAS_NOME] == nome)
}