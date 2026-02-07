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
// ****************************************************************************
// publicarCronograma - O sistema executa essa lógica depois que o usuário opta 
// por ignorar o planejamento do cronograma para essa data e período
// Input
// 		data (Date), A data a ser ignorada
// 		periodo (Date), O periodo a ser ignorado
// 		pordem (Date), A ordem a ser ignorada
// Output
// 		true, no caso de uma inserção bem-sucedida da data e do período 
// 		ignorados na planilha Publicados; false otherwise
// ****************************************************************************
//
function publicarCronograma(data, periodo, ordem)  {
	let dataStr =  CararaLibrary.dateToString(data);
	let cronograma = [[dataStr, periodo, ordem]];

	// Insira esse cronograma na planilha Publicados
	let planilhaPublicados = obterPlanilhaPublicados()
	let lastRow = planilhaPublicados.getLastRow();
	planilhaPublicados.getRange(lastRow + 1, 1, cronograma.length, cronograma[0].length).setValues(cronograma)
}