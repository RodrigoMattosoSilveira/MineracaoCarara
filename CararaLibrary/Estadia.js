const ESTADIAS_PLANILHA     = "Estadias";
const ESTADIAS_GAMA         = "EstadiaGama";
const ESTADIAS_NOME         = 0;
const ESTADIAS_INICIO       = 1;
const ESTADIAS_FIM          = 2;
const ESTADIAS_DISPONIVEL   = 3;
const ESTADIAS_METODO       = 4;
const ESTADIAS_SETOR        = 5;
const ESTADIAS_LOCAL        = 6;
const ESTADIAS_TAREFA       = 7;
const ESTADIAS_REMUNERACAO  = 8;
const ESTADIAS_COMENTARIOS  = 9;

function obterEstadiasPlanilha () { return SpreadsheetApp.openById(ESTADIAS_ID); }
function obterEstadiasGama () { return obterEstadiasPlanilha().getRangeByName(ESTADIAS_GAMA); }
function obterEstadiasGamaVals () {
	let  gama = obterEstadiasGama();
	return  (gama !== null) ? gama.getValues().filter( elemento => elemento[ESTADIAS_NOME] !== '' && elemento[ESTADIAS_NOME] !== 'Nome') : [];
}
function obterEstadiaGamaRegistroNome(nome) {
	let estadiaGamaVals = obterEstadiasGamaVals()
	return estadiaGamaVals.find((element) => element[ESTADIAS_NOME] == nome)
}