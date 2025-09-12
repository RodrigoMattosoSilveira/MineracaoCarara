// ****************************************************************************
// Menu - This is a set of functions
// ****************************************************************************
// 
function onOpen(e) {
  var ui = SpreadsheetApp.getUi();

  // Or DocumentApp, SlidesApp or FormApp.
	ui.createMenu('Producao')
		.addItem('Registrar', 'producaoRegistrar')
	.addToUi();
}
/* *****************************************************************************
 * Grencia a tarefa de coletar a produção diária e periódica de ouro.
 * @parm {e}, o ambiente 
 * @returns nonne
 * ************************************************************************** */
// 
function producaoRegistrar() {
	SpreadsheetApp.getActiveSpreadsheet().toast('Inicio', 'Registrar Produção');
}

/* *****************************************************************************
 * Retorna a produção do poço para em uma data e período
 * @parm {Date}, data - O dia de interesse
 * @parm {String}, poco - O nome to poco de interessse
 * @parm {String}, periodo - O periodo de interesse
 * @returns (float | null) a producao produção do poço na data e periodo de 
 * interesse; null caso contrário
 * ************************************************************************** */
// 
function obterProducaoDataPocoPeriodo(data, poco, periodo) {
	let chave = CararaLibrary.dateToString(data) + poco + periodo;
	let matrizProducao = obterProducaoGamaVals().filter((registro) => {
		dataChave = CararaLibrary.dateToString(registro[PRODUCAO_DATA_COL]) + registro[PRODUCAO_POCO_NOME_COL] +  registro[PRODUCAO_PERIODO_NOME_COL];	
		return chave === dataChave;		
	});  
	return  matrizProducao.length === 1 ? matrizProducao[0][PRODUCAO_QUANTIDADE_COL] : null;
}

if (typeof module !== 'undefined') module.exports = {
	apresentarDialogoProducaoDataPocoPeriodo, apresentarDialogoModelar
};