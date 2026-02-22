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

// TODO: Refatorar para ser mais generica;
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
	const numRows     = sheet.getLastRow() - 1;
	sheet.getRange(startRow, 1, numRows).activate();

	// Adicionar novas regras de formatação condicional
	let conditionalFormatRules = sheet.getConditionalFormatRules();
	conditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
	.setRanges([sheet.getRange(startRow, 1, numRows)])
	.whenTextContains('Excluir')
	.setFontColor('#FF0000')
	.setBackground('#FFFFFF')
	.build());
	sheet.setConditionalFormatRules(conditionalFormatRules);

	conditionalFormatRules = sheet.getConditionalFormatRules();
	conditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
	.setRanges([sheet.getRange(startRow, 1, numRows)])
	.whenTextContains('Incluir')
	.setFontColor('#00873E')
	.setBackground('#FFFFFF')
	.build());
	sheet.setConditionalFormatRules(conditionalFormatRules);
}

/**
 * Converts a number (1-26) to its uppercase letter equivalent.
 * @param {number} num - The number to convert (1 = A, 26 = Z).
 * @returns {string|null} - The uppercase letter or null if invalid.
 */
function numberToUppercaseLetter(num) {
    // Validate input
    if (typeof num !== "number" || !Number.isInteger(num) || num < 1 || num > 26) {
        console.error("Invalid input: must be an integer between 1 and 26.");
        return null;
    }
    // Convert number to uppercase letter
    return String.fromCharCode(64 + num); // 65 is 'A', so 64 + num
}