const GOOGLE_SHEET_PRODUCAO_ID = "1XJQmUb-1W2egXWj000Uer8QS6FZd7lUgqppoehjxwj4";
const _obterProducaoGoogleSheet = () =>  SpreadsheetApp.openById(GOOGLE_SHEET_PRODUCAO_ID);

const PRODUCAO_PLANILHA_NOME = 'Producao';
const PRODUCAO_GAMA_NOME = 'Producao';
const PRODUCAO_DATA_COL = 0;
const PRODUCAO_POCO_NOME_COL = 1
const PRODUCAO_PERIODO_NOME_COL = 2;
const PRODUCAO_QUANTIDADE_COL = 3;

const _obterProducaoPlanilha = () => _obterProducaoGoogleSheet().getSheetByName(PRODUCAO_PLANILHA_NOME);
const _obterProducaoGama = () => _obterProducaoGoogleSheet().getRangeByName(PRODUCAO_GAMA_NOME);
const obterProducaoGamaVals = () => {
	let  gama = _obterProducaoGama();
	return  (gama !== null) ? gama.getValues().filter( elemento => elemento[PRODUCAO_DATA_COL] !== '' && elemento[PRODUCAO_DATA_COL] !== 'Data') : [];
}
