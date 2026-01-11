// *** Identificação da folhas das Despesas
// 
const despesasID 		  = "1XwjBUJYG4VLN0ZaG0EFzKljWk9VdGvePaDO9Nwd70G4";
const despesasSpreadSheet = SpreadsheetApp.openById(despesasID);
function despesasGetSpreaSheet() {
	return SpreadsheetApp.openById(despesasID);
} 

// *** Layout do formulário Cantina
// 
const despesasCantinaTab = despesasSpreadSheet.getSheetByName("Cantina");
const CantinaDataRange = despesasCantinaTab.getRange("CantinaData");

const CantinaColaboradorRange 	= despesasCantinaTab.getRange("CantinaColaborador");
const CantinaEstadiaRange 		= despesasCantinaTab.getRange("CantinaEstadia");
const CantinaPagementoRange 	= despesasCantinaTab.getRange("CantinaPagemento");
const CantinaMoedaRange 		= despesasCantinaTab.getRange("CantinaMoeda");
const CantinaDespesasRange 		= despesasCantinaTab.getRange("CantinaDespesas");
const CantinaComentarioRange	= despesasCantinaTab.getRange("CantinaComentario");
const CantinaSaldoRange 		= despesasCantinaTab.getRange("CantinaSaldo");
const CantinaAGanharRange 		= despesasCantinaTab.getRange("CantinaAGanhar");

const CantinaItemsRange = despesasCantinaTab.getRange("CantinaItems");
const CantinaQuantidadesRange = despesasCantinaTab.getRange("CantinaQuantidades");

const CantinaDespesasItemCol 		= 0;	
const CantinaDespesasRealol 		= 1;
const CantinaDespesasOuroCol 		= 2;	
const CantinaDespesasQTDCol 		= 3
const CantinaDespesasTotalRealCol 	= 4;
const CantinaDespesasTotaOurolCol 	= 5;

// *** Layout do formulário PIX
// 
const despesasPixTab = despesasSpreadSheet.getSheetByName("Pix");
const PixDataRange = despesasPixTab.getRange("PixData");

const PixColaboradorRange   = despesasPixTab.getRange("PixColaborador");
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

// *** Layout do formulário Diversos
// 
const despesasDiversosTab = despesasSpreadSheet.getSheetByName("Diversos");
const DiversosDataRange = despesasDiversosTab.getRange("DiversosData");

const DiversosColaboradorRange   = despesasDiversosTab.getRange("DiversosColaborador");
const DiversosEstadiaRange       = despesasDiversosTab.getRange("DiversosEstadia");
const DiversosPagementoRange     = despesasDiversosTab.getRange("DiversosPagamento");
const DiversosMoedaRange         = despesasDiversosTab.getRange("DiversosMoeda");
const DiversosDespesasRange      = despesasDiversosTab.getRange("DiversosDespesas");
const DiversosComentarioRange    = despesasDiversosTab.getRange("DiversosComentario");

const DiversosItemsRange = despesasDiversosTab.getRange("DiversosItems");
const DiversosRealRange = despesasDiversosTab.getRange("DiversosReal");
const DiversosQuantidadesRange = despesasDiversosTab.getRange("DiversosQuantidades");

const DiversosDespesasItemCol        = 0;  
const DiversosDespesasRealol         = 1;
const DiversosDespesasOuroCol        = 2;  
const DiversosDespesasQTDCol         = 3
const DiversosDespesasTotalRealCol   = 4;
const DiversosDespesasTotaOurolCol   = 5;

// *** Layout do formulário Folga
// 
despesasFolgaTab = despesasSpreadSheet.getSheetByName("Folga");
const FolgaDataRange = despesasFolgaTab.getRange("FolgaData");

const FolgaColaboradorRange        = despesasFolgaTab.getRange("FolgaColaborador");
const FolgaEstadiaRange            = despesasFolgaTab.getRange("FolgaEstadia");
const FolgaPagementoRange          = despesasFolgaTab.getRange("FolgaPagamento");
const FolgaMoedaRange              = despesasFolgaTab.getRange("FolgaMoeda");
const FolgaDespesasRange           = despesasFolgaTab.getRange("FolgaDespesas");
const FolgaSubstituidoRange        = despesasFolgaTab.getRange("FolgaSubstituido");
const FolgaSubstituidoDiariaRange  = despesasFolgaTab.getRange("FolgaSubstituidoDiaria");
const FolgaComentarioRange         = despesasFolgaTab.getRange("FolgaComentario");

const FolgaItemsRange = despesasFolgaTab.getRange("FolgaItems");
const FolgaRealRange = despesasFolgaTab.getRange("FolgaReal");
const FolgaQuantidadesRange = despesasFolgaTab.getRange("FolgaQuantidades");

const FolgaDespesasItemCol        = 0;  
const FolgaDespesasRealol         = 1;
const FolgaDespesasOuroCol        = 2;  
const FolgaDespesasQTDCol         = 3
const FolgaDespesasTotalRealCol   = 4;
const FolgaDespesasTotaOurolCol   = 5;

// *** Identificação da Sheet Contas Correntes
// 
const contasCorrentesId 					= "10QXCS1QspqKH8owJQiazFc1dSumWy94mgHIVhZargcA";
const contasCorrentesSheet 					= SpreadsheetApp.openById(contasCorrentesId);
const contasCorrentesTab 					= contasCorrentesSheet.getSheetByName("ContasCorrentes");
const contasCorrentesDadosTab 				= contasCorrentesSheet.getSheetByName("Dados");
// const contasCorrentesDadosRange 			= contasCorrentesDadosTab.getRange("Dados");

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

// function onOpen(e) {
//   var ui = SpreadsheetApp.getUi();

//   // Or DocumentApp, SlidesApp or FormApp.
// 		ui.createMenu('Despesa')
// 		.addSubMenu(ui.createMenu('Cantina')
// 			.addItem('Cantina Prepare', 'cantinaPrepare')
// 			.addItem('Cantina Execute', 'cantinaExecute')
// 		)
// 		.addSubMenu(ui.createMenu('PIX')
// 			.addItem('PIX Prepare', 'pixPrepare')
// 			.addItem('PIX Execute', 'pixExecute')
// 		)	

// 		.addSubMenu(ui.createMenu('Diversos')
// 			.addItem('Diversos Prepare', 'diversosPrepare')
// 			.addItem('Diversos Execute', 'diversosExecute')
// 		)

// 		.addSubMenu(ui.createMenu('Folga')
// 			.addItem('Folga Prepare', 'folgaPrepare')
// 			.addItem('Folga Execute', 'folgaExecute')
// 		)
// 		.addSubMenu(ui.createMenu('Fechar')
// 			.addItem('Prepare', 'fecharPrepare')
// 			.addItem('Feche', 'fecharExecute')
// 		)

// 		.addToUi();
// }

function switchToTab(sheetName) {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getSheetByName(sheetName);
  if (sheet) {
    spreadsheet.setActiveSheet(sheet);
  } else {
    Logger.log("Sheet with name '" + sheetName + "' not found.");
  }
}