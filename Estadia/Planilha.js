const ESTADIAS_PLANILHA    = "Estadias";
const ESTADIAS_GAMA        = "Estadias";
const ESTADIAS_NOME        = 0;
const ESTADIAS_INICIO      = 1;
const ESTADIAS_METODO      = 2;
const ESTADIAS_SETOR       = 3;
const ESTADIAS_LOCAL       = 4;
const ESTADIAS_TAREFA      = 5;
const ESTADIAS_REMUNERACAO = 6;
const ESTADIAS_COMENTARIOS = 7;

const obterEstadiasPlanilha = () => obterGoogleSheet().getSheetByName(ESTADIAS_PLANILHA);
const obterEstadiasGama = () => obterGoogleSheet().getRangeByName(ESTADIAS_GAMA);
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

