const despesasID = "1XwjBUJYG4VLN0ZaG0EFzKljWk9VdGvePaDO9Nwd70G4";
const despesasSheet = SpreadsheetApp.openById(despesasID);

const despesasCantinaTab = despesasSheet.getSheetByName("Cantina");
const CantinaDataRange = despesasCantinaTab.getRange("CantinaData");

const CantinaAssociadoRange 	= despesasCantinaTab.getRange("CantinaAssociado");
const CantinaEstadiaRange 		= despesasCantinaTab.getRange("CantinaEstadia");
const CantinaPagementoRange 	= despesasCantinaTab.getRange("CantinaPagemento");
const CantinaMoedaRange 		= despesasCantinaTab.getRange("CantinaMoeda");
const CantinaDespesasRange 		= despesasCantinaTab.getRange("CantinaDespesas");
const CantinaComentarioRange	= despesasCantinaTab.getRange("CantinaComentario");

const CantinaItemsRange = despesasCantinaTab.getRange("CantinaItems");
const CantinaQuantidadesRange = despesasCantinaTab.getRange("CantinaQuantidades");

const CantinaDespesasItemCol 		= 0;	
const CantinaDespesasRealol 		= 1;
const CantinaDespesasOuroCol 		= 2;	
const CantinaDespesasQTDCol 		= 3
const CantinaDespesasTotalRealCol 	= 4;
const CantinaDespesasTotaOurolCol 	= 5;

const despesasPixTab = despesasSheet.getSheetByName("Pix");
const PixDataRange = despesasPixTab.getRange("PixData");

const PixAssociadoRange   	= despesasPixTab.getRange("PixAssociado");
const PixEstadiaRange     	= despesasPixTab.getRange("PixEstadia");
const PixPagementoRange   	= despesasPixTab.getRange("PixPagamento");
const PixMoedaRange     	= despesasPixTab.getRange("PixMoeda");
const PixDespesasRange    	= despesasPixTab.getRange("PixDespesas");
const PixComentarioRange  	= despesasPixTab.getRange("PixComentario");

const PixItemsRange = despesasPixTab.getRange("PixItems");
const PixRealRange = despesasPixTab.getRange("PixReal");
const PixQuantidadesRange = despesasPixTab.getRange("PixQuantidades");

const PixDespesasItemCol        = 0;  
const PixDespesasRealol         = 1;
const PixDespesasOuroCol        = 2;  
const PixDespesasQTDCol         = 3
const PixDespesasTotalRealCol   = 4;
const PixDespesasTotaOurolCol   = 5;

const contasCorrentesId 					= "10QXCS1QspqKH8owJQiazFc1dSumWy94mgHIVhZargcA";
const contasCorrentesSheet 					= SpreadsheetApp.openById(contasCorrentesId);
const contasCorrentesTab 					= contasCorrentesSheet.getSheetByName("ContasCorrentes");
const contasCorrentesDadosTab 				= contasCorrentesSheet.getSheetByName("Dados");
const contasCorrentesDadosRange 			= contasCorrentesDadosTab.getRange("Dados");

const contasCorrentesDataCol              	= 0;
const contasCorrentesNomeCol              	= 1;
const contasCorrentesEstadiaCol           	= 2;
const contasCorrentesMetodoCol            	= 3;  // Diaria, Salario, Porcentagem, Cantina, PIX, Diversos, Voo, Fechar, substitua por outro
const contasCorrentesMoedaCol             	= 4   // Real, Ouro
const contasCorrentesCreditDebitCol       	= 5;  // Credito, Debito
const contasCorrentesItemCol              	= 6;
const contasCorrentesPrecoUnidadeRealCol  	= 7;  // Real
const contasCorrentesPrecoUnidadeOuroCol  	= 8;  // Gramas de ouro 
const contasCorrentesItemQtdCol           	= 9;
const contasCorrentesTotalRealCol         	= 10; // Real
const contasCorrentesTotalOuroCol         	= 11; // Gramas de ouro
const contasCorrentesComentariosCol       	= 12

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