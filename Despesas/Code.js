const despesasID = "1XwjBUJYG4VLN0ZaG0EFzKljWk9VdGvePaDO9Nwd70G4";
const despesasSheet = SpreadsheetApp.openById(despesasID);
const despesasCantinaTab = despesasSheet.getSheetByName("Cantina");
const CantinaNome = despesasCantinaTab.getRange("CantinaAssociado").getValue();
const CantinaEstadia = despesasCantinaTab.getRange("CantinaEstadia").getValue();
const CantinaData = despesasCantinaTab.getRange("CantinaData").getValue();
const CantinaDespesas = despesasCantinaTab.getRange("CantinaDespesas").getValues();
const CantinaDespesasItemCol 		= 0;	
const CantinaDespesasRealol 		= 1;
const CantinaDespesasOuroCol 		= 2;	
const CantinaDespesasQTDCol 		= 3
const CantinaDespesasTotalRealCol 	= 4;
const CantinaDespesasTotaOurolCol 	= 5;
const CantinaDespesasComentariosCol = 6;

const despesasPixTab = despesasSheet.getSheetByName("Pix");
const PixNome = despesasPixTab.getRange("PixAssociado").getValue();
const PixEstadia = despesasPixTab.getRange("PixEstadia").getValue();
const PixData = despesasPixTab.getRange("PixData").getValue();
const PixDespesas = despesasPixTab.getRange("PixDespesas").getValues();
const PixDespesasItemCol    = 0;  
const PixDespesasRealol     = 1;
const PixDespesasOuroCol    = 2;  
const PixDespesasQTDCol     = 3
const PixDespesasTotalRealCol   = 4;
const PixDespesasTotaOurolCol   = 5;
const PixDespesasComentariosCol = 6;

function onOpen() {
  var ui = SpreadsheetApp.getUi();

  // Or DocumentApp, SlidesApp or FormApp.
		ui.createMenu('Despesa')
		.addSubMenu(ui.createMenu('Cantina')
			.addItem('Cantina Prepare', 'cantinaPrepare')
			.addItem('Cantina Execute', 'cantinaExecute')
		)
		.addSubMenu(ui.createMenu('PIX')
			.addItem('PIX Prepare', 'pixPrepare')
			.addItem('PIX Execute', 'pixExecute')
		)	
		.addSubMenu(ui.createMenu('Voo')
			.addItem('Voo Prepare', 'vooPrepare')
			.addItem('Voo Execute', 'vooExecute')
		)

		.addSubMenu(ui.createMenu('Diversos')
			.addItem('Diversos Prepare', 'diversosPrepare')
			.addItem('Diversos Execute', 'diversosExecute')
		)
		.addSubMenu(ui.createMenu('Fechar')
			.addItem('Fechar Prepare', 'fecharPrepare')
			.addItem('Fechar Execute', 'fecharExecute')
		)

		.addToUi();
}

function cantinaPrepare() {
  	switchToTab("Cantina");
  	SpreadsheetApp.getUi() // Or DocumentApp, SlidesApp or FormApp.
		.alert('You clicked cantinaPrepare');
	}

function cantinaExecute() {
  	switchToTab("Cantina");
	SpreadsheetApp.getUi() // Or DocumentApp, SlidesApp or FormApp.
		.alert('You clicked cantinaExecute');
}

function pixPrepare() {
  	switchToTab("Pix");
	SpreadsheetApp.getUi() // Or DocumentApp, SlidesApp or FormApp.
		.alert('You clicked on pixPrepare');
}

function pixExecute() {
  	switchToTab("Pix");
	SpreadsheetApp.getUi() // Or DocumentApp, SlidesApp or FormApp.
		.alert('You clicked pixExecute');
}

function vooPrepare() {
	switchToTab("Voo");
  	SpreadsheetApp.getUi() // Or DocumentApp, SlidesApp or FormApp.
    	.alert('You clicked on vooPrepare');
}

function vooExecute() {
	switchToTab("Voo");
  	SpreadsheetApp.getUi() // Or DocumentApp, SlidesApp or FormApp.
    	.alert('You clicked vooExecute');
}

function diversosPrepare() {
	switchToTab("Diversos");
  	SpreadsheetApp.getUi() // Or DocumentApp, SlidesApp or FormApp.
    	.alert('You clicked on diversosPrepare');
}

function diversosExecute() {
	switchToTab("Diversos");
  	SpreadsheetApp.getUi() // Or 
    	.alert('You clicked the diversosExecute');
}

function fecharPrepare() {
	switchToTab("Fechar");
  	SpreadsheetApp.getUi() // Or DocumentApp, SlidesApp or FormApp.
    	.alert('You clicked on fecharPrepare');
}

function fecharExecute() {
	switchToTab("Fechar");
	SpreadsheetApp.getUi() // Or DocumentApp, SlidesApp or FormApp.
		.alert('You clicked the fecharExecute');
}

function switchToTab(sheetName) {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getSheetByName(sheetName);
  if (sheet) {
    spreadsheet.setActiveSheet(sheet);
  } else {
    Logger.log("Sheet with name '" + sheetName + "' not found.");
  }
}