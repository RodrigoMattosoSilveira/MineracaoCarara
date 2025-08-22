// CararaLibrary
// SciptID: 1MUcp-N2BXCoJI3ussufDnfghByRVGBATXMPP7BeZg-1iCQXbrKw5rzaO
// Software: https://script.google.com/home/projects/1MUcp-N2BXCoJI3ussufDnfghByRVGBATXMPP7BeZg-1iCQXbrKw5rzaO/edit 
// 
function onOpen(e) {
	var ui = SpreadsheetApp.getUi();

  	// Or DocumentApp, SlidesApp or FormApp.
	ui.createMenu('Teste')
		.addItem('Run Fancy Dialog', 'showDialog')
		.addItem('Run Conditional Dialog', 'checkConditionAndShowDialog')
		.addToUi();	
}

function checkConditionAndShowDialog() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  // https://github.com/vineethtrv/css-loader
  let modalTitulo = "Fechar Contas Correntes"
  showDialog(modalTitulo);
}

function showCustomDialogSimple() {
  const html = HtmlService.createHtmlOutputFromFile('Dialog')
    .setWidth(400)
    .setHeight(300);
  SpreadsheetApp.getUi().showModalDialog(html, 'Custom Modal Dialog');
}

function showDialog(modalTitulo) {
  var ui = SpreadsheetApp.getUi();
  var template = HtmlService.createTemplateFromFile('Dialog')
  var html = template.evaluate()    	
    .setWidth(400)
    .setHeight(300);
  ui.showModalDialog(html, modalTitulo);
}

function processData() {
  // Simulate a long process,  a delay of 5 seconds
  Utilities.sleep(15000);

  // Close the dialog after processing
  // SpreadsheetApp.getUi().alert('Processing complete!');
}

function runLibrary() {
 CararaLibrary.removeDuplicates();
}