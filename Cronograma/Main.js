/*
Planejar: Cronograma!Anterior + Estadia!Dados ➞  Cronograma!Planejar:
	Planejador seleciona o Menu Planejar
	Sistema solicita ao planejador o Período a Planejar
	Planejador seleciona o Período a Planejar
	Sistema limpa a guia Planejar
	Sistema copia Dados para Planejar ➞ No Anterior ? Acao = Verde : Acao = Vermelho
	O planejador ajusta (Inclui/Exclui/Edita) registros na guia Planejar

Informar: Cronograma!Planejar ➞ Cronograma!Ativos
	Planejador seleciona o menu Informar
	Sistema limpa a guia Ativos
	Sistema preenche a guia Ativos com registros da guia Planejar
	Sistema limpa a guia PDF
	Sistema usa a guia Ativos para gerar a guia PDF
	O Planejador seleciona a guia PDF
	O Planejador imprime a guia PDF

Contabilizar: Cronograma!Contabilizar ➞ ContasCorrentes!Dados
	Ao concluir o trabalho e antes de contabilizar o trabalho realizado: 
		O Planejador edita a guia Ativos, conforme necessário
	O Planejador seleciona o menu Contabilizar
	O sistema addiciona os registros da guia Ativos para a guia Anterior e para a guia Contabilizar
	O sistema registra lançamentos no livro-razão:
		Colaboradores Diária
			com o valor da diária
			marca o registro de Contabilizar para ser excluído
		Colaboradores Salário
			zero como total se não for o último dia do mês
			salário se for o último dia do mês
			marca o registro de Contabilizar para ser excluído
		Colaboradores Porcentagem / M-Porcentagem
			com percentual da produção do poço, com registro de produção do poço
			marca o registro de Contabilizar para ser excluído
	O sistema remove os registros marcados para exclusão da guia Contabilizar

 */

// ****************************************************************************
// Menu - This is a set of functions
// ****************************************************************************
// 
function onOpen() {
  var ui = SpreadsheetApp.getUi();

  // Or DocumentApp, SlidesApp or FormApp.
	ui.createMenu('Cronograma')
		.addItem('Planejar',     'cronogramaPlanejar')
		.addItem('Informar',     'cronogramaInformar')
		.addItem('Contabilizar', 'cronogramaContabilizar')
	.addToUi();
}
/** ****************************************************************************
 * publicarCronograma - O sistema executa essa lógica para incluir um resitro
 * indicando a para futuros planejamentos para planejar para datas e periodos
 * seguinte a essa data e periodo. 
 * Input
 * @param Date, data do ultimo cronograma planejado
 * @param string, periodo do ultimo cronograma planejado
 * @param ordem, ordem do ultimo cronograma planejado
 * @return none
 **************************************************************************** */
function publicarCronograma(data, periodo, ordem)  {
	let dataStr =  CararaLibrary.dateToString(data);
	let cronograma = [[dataStr, periodo, ordem]];

	// Insira esse cronograma na planilha Publicados
	planilhaPublicados.insertRowBefore(PUBLICADOS_FIRST_ROw);
	planilhaPublicados.getRange(PUBLICADOS_FIRST_ROw, 1, cronograma.length, cronograma[0].length).setValues(cronograma);
}

/** 
 * Pinte of texto da columna ACAO: Verde para Incluir, Vermelho para Excluir;
  * @param {string} sheetName, nome da sheet com o texto a ser pintado
  * @return none
 */
function pintarAcao(sheetName) {
	const spreadsheet = obterGoogleSheet();
	const sheet       = spreadsheet.getSheetByName(sheetName);

	// Gama para pintar
	const startRow    = 2;
	const startColumn = 1;
	const numRows     = spreadsheet.getLastRow() - 1;
	const numCols     = 1

	const acaoRange   = sheet.getRange(startRow, startColumn, numRows, numCols)

	let conditionalFormatRules = spreadsheet.getConditionalFormatRules();
	conditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
	.setRanges(acaoRange)
	.whenTextContains('Excluir')
	.setFontColor('#FF0000')
	.setBackground('#FFFFFF')
	.build());

	conditionalFormatRules = spreadsheet.getConditionalFormatRules();
	conditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
	.setRanges(acaoRange)
	.whenTextContains('Incluir')
	.setFontColor('#00FF00')
	.setBackground('#FFFFFF')
	.build());

}