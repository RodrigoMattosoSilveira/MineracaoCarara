// ****************************************************************************
// Menu - This is a set of functions
// ****************************************************************************
// 
function onOpen() {
  	// Initialize the menu
 	var ui = SpreadsheetApp.getUi();
	ui.createMenu('Estadia')
		.addItem('Adicionar Colaborador', 'estadiaAdicionarColaborador')
		.addItem('Adicionar Validacoes', 'ConfigureSpreadsheetDataValidations')
	.addToUi();

	// Data validations
	ConfigureSpreadsheetDataValidations ()
}
