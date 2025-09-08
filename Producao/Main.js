function obterGoogleSheet () { return SpreadsheetApp.openById(GOOGLE_SHEET_ID); }
function obterProducaoGama (gamaName) {
	return obterGoogleSheet().getRangeByName(gamaName);
}
function obterProducaoGamaVals(gamaName) {
	let  gama = obterProducaoGama(gamaName);
	return  (gama !== null) ? gama.getValues().filter( elemento => elemento[PRODUCAO_DATA] !== '' && elemento[PRODUCAO_DATA] !== 'Data') : [];
}
function obterProducaoPocosNomes() {
	return obterGoogleSheet().getSheets().filter( sheet => sheet.getName().startsWith("Poço_")).map( sheet => sheet.getName());
}
function validarProducaoPlanilhaTemPoco(pocoNome) {
	return obterProducaoPocosNomes().indexOf(pocoNome) !== -1 ? true : false;
}
function obterProducaoPoco (pocoNome, data) {
	if (!validarProducaoPlanilhaTemPoco(pocoNome)) {
		return null;
	}
	let pocoGamaVals = obterProducaoGamaVals(pocoNome);
	let dataStr = CararaLibrary.dateToString(data);
	let pocoDataVals = pocoGamaVals.filter( elemento => CararaLibrary.dateToString(elemento[PRODUCAO_DATA]) === dataStr);
	return (pocoDataVals.length > 0) ? pocoDataVals[0] : null;
} 
function obterProducaoPocos (data) {
	let pocos = obterProducaoPocosNomes();
	let pocosDataVals = {};
	for (let i = 0; i < pocos.length; i++) {
		let pocoNome = pocos[i];
		let pocoDataVals = obterProducaoPoco(pocoNome, data);
		if (pocoDataVals !== null && pocoDataVals[PRODUCAO_QTD] !== '') {
			pocosDataVals[pocoNome] = pocoDataVals[PRODUCAO_QTD];
		}
	}
	return pocosDataVals;
}
if (typeof module !== 'undefined') module.exports = {
    obterProducaoPocosNomes,
	validarProducaoPlanilhaTemPoco,
	obterProducaoPoco,
};