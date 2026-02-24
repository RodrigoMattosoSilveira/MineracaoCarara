// ****************************************************************************
// Menu - This is a set of functions
// ****************************************************************************
// 
function onOpen() {
  var ui = SpreadsheetApp.getUi();

  // Or DocumentApp, SlidesApp or FormApp.
	ui.createMenu('Estadia')
		.addItem('Adicionar Colaborador', 'estadiaAdicionarColaborador')
	.addToUi();
}