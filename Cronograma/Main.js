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