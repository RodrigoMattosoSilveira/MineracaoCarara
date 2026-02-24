const ESTADIA_GOOGLE_SHEET_ID = "1cBWZwZ8JPJARGNFmjFAFzKIaPApeO5kN8jencYUVki4";
const PESSOA_GOOGLE_SHEET_ID  = "1d3XkRXMeOO6Zzn6oxPoK86GU99V-yPa-7e77SrMxoIM";
const obterGoogleSheet        = (PlanilhaGoggleIdD) =>  SpreadsheetApp.openById(PlanilhaGoggleIdD);

const ESTADIAS_PLANILHA    = "Dados";
const ESTADIAS_GAMA        = "EstadiaGama";
const ESTADIAS_FIRST_ROw   = 2;
const ESTADIAS_NOME        = 0;
const ESTADIAS_INICIO      = 1;
const ESTADIAS_METODO      = 2;
const ESTADIAS_SETOR       = 3;
const ESTADIAS_LOCAL       = 4;
const ESTADIAS_TAREFA      = 5;
const ESTADIAS_REMUNERACAO = 6;
const ESTADIAS_COMENTARIOS = 7;

const obterEstadiasPlanilha = () => obterGoogleSheet(ESTADIA_GOOGLE_SHEET_ID).getSheetByName(ESTADIAS_PLANILHA);
const obterEstadiasGama     = () => obterGoogleSheet(ESTADIA_GOOGLE_SHEET_ID).getRangeByName(ESTADIAS_GAMA);
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

const obterPessoaGoogleSheet = ()   =>  SpreadsheetApp.openById(PESSOA_GOOGLE_SHEET_ID);

const PESSOA_PLANILHA     = "Dados";
const PESSOA_GAMA         = "Pessoas";
const PESSOA_NOME         = 0;
const PESSOA_CPF          = 1;
const PESSOA_RG           = 2;
const PESSOA_CELULAR      = 3;
const PESSOA_EMAIL        = 4;

const obterPessoaPlanilha = () => obterGoogleSheet(PESSOA_GOOGLE_SHEET_ID).getSheetByName(PESSOA_PLANILHA);
const obterPessoaGama     = () => obterGoogleSheet(PESSOA_GOOGLE_SHEET_ID).getRangeByName(PESSOA_GAMA);
const obterPessoaGamaVals = () => {
    let  gama = obterPessoaGama();
    return  (gama !== null) ? gama.getValues().filter( elemento => 
                elemento[PESSOA_NOME] !== '' && 
                elemento[PESSOA_NOME] !== 'Nome') : [];
}
const obterPessoasNomes   = () => {
    let  gamaVals = obterPessoaGamaVals();
    return  (gamaVals !== null) ? gamaVals.map( elemento => elemento[PESSOA_NOME]) : [];
}
