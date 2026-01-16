const PRODUCAO_GAMA_NOME     = 'Producao';
const PRODUCAO_DATA_COL         = 0;
const PRODUCAO_POCO_NOME_COL    = 1
const PRODUCAO_PERIODO_NOME_COL = 2;
const PRODUCAO_QUANTIDADE_COL   = 3;

const _obterProducaoGoogleSheet = () =>  SpreadsheetApp.openById(PRODUCAO_ID);
const _obterProducaoPlanilha    = () => _obterProducaoGoogleSheet().getSheetByName(PRODUCAO_PLANILHA_NOME);
const _obterProducaoGama        = () => _obterProducaoGoogleSheet().getRangeByName(PRODUCAO_GAMA_NOME);
const obterProducaoGamaVals     = () => {
	let  gama = _obterProducaoGama();
	return  (gama !== null) ? gama.getValues().filter( elemento => elemento[PRODUCAO_DATA_COL] !== '' && elemento[PRODUCAO_DATA_COL] !== 'Data') : [];
}
/**
 *  Obter os registros que representam a produção diária do poço nos últimos 
 * 'dias' dias
 * @param {string} poco - Nome to poço
 * @returns {Array of Arrays} - os registros que representam produção 
 * diária do poço nos últimos 
 */
const obterProducaoPoco = (poco) => {
	let  producaoPoco = obterProducaoGamaVals();
	return  (producaoPoco !== null) ? producaoPoco.filter( elemento => elemento[PRODUCAO_POCO_NOME_COL] === poco) : [];
}
/**
 *  Obter os registros que representam a produção diária do poço nos últimos 
 * 'dias' dias
 * @param {string} poco - Nome to poço
 * @param {number} dias - Número de dias para trás a partir de hoje
 * @returns {Array of Arrays} - os registros que representam produção desejada
 * diária do poço nos últimos 
 */
const obterProducaoPocoRecente = (poco, dias) => {
	let dataLimite    = getDateMinusDays(dias);
	let producaoPoco = obterProducaoPoco(poco);
	let dataHoje = new Date();
	return  (producaoPoco !== null) ? producaoPoco.filter( elemento => {
		let dataElemento = new Date(elemento[PRODUCAO_DATA_COL]);
		return dataElemento >= dataLimite && dataElemento <= dataHoje;
	}) : [];
}

/**
 *  Obter os registros que representam a produção diária do poço nos últimos 
 * 'dias' dias
 * @param {string} poco - Nome to poço
 * @param {number} dias - Número de dias para trás a partir de hoje
 * @param {number} turnos - Número de turnos
 * @returns {number} - a produção média diária do poço, por turno, nos últimos dias
 */
const obterProducaoPocoRecenteMedia = (poco, dias) => {
	let producaoPoco = obterProducaoPocoRecente(poco, dias);
	let totalProducao = 0;
	producaoPoco.forEach( elemento => {
		totalProducao += elemento[PRODUCAO_QUANTIDADE_COL];
	});	
	return (producaoPoco.length > 0) ? totalProducao / producaoPoco.length : 0;
}
