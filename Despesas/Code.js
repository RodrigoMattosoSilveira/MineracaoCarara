// *** Identificação da folhas das Despesas
// 
const despesasID 		  = "1XwjBUJYG4VLN0ZaG0EFzKljWk9VdGvePaDO9Nwd70G4";
const despesasSpreadSheet = SpreadsheetApp.openById(despesasID);
function despesasGetSpreaSheet() {
	return SpreadsheetApp.openById(despesasID);
} 

// *** Layout do formulário Cantina
// 
const despesasCantinaTab      = despesasSpreadSheet.getSheetByName("Cantina");
const CantinaDataRange        = despesasCantinaTab.getRange("CantinaData");

const CantinaColaboradorRange = despesasCantinaTab.getRange("CantinaColaborador");
const CantinaEstadiaRange 		= despesasCantinaTab.getRange("CantinaEstadia");
const CantinaPagementoRange 	= despesasCantinaTab.getRange("CantinaPagemento");
const CantinaMoedaRange 		  = despesasCantinaTab.getRange("CantinaMoeda");
const CantinaDespesasRange 		= despesasCantinaTab.getRange("CantinaDespesas");
const CantinaComentarioRange	= despesasCantinaTab.getRange("CantinaComentario");
const CantinaSaldoOuroRange 	= despesasCantinaTab.getRange("CantinaSaldoOuro");
const CantinaSaldoRealRange 	= despesasCantinaTab.getRange("CantinaSaldoReal");
const CantinaFuturoOuroRange 	= despesasCantinaTab.getRange("CantinaFuturoOuro");
const CantinaFuturoRealRange 	= despesasCantinaTab.getRange("CantinaFuturoReal");

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

const PixDataRange 	          = despesasPixTab.getRange("PixData");
const PixColaboradorRange     = despesasPixTab.getRange("PixColaborador");
const PixEstadiaRange     	  = despesasPixTab.getRange("PixEstadia");
const PixPagementoRange   	  = despesasPixTab.getRange("PixPagamento");
const PixComentarioRange  	  = despesasPixTab.getRange("PixComentario");

const PixDespesasRange    	   = despesasPixTab.getRange("PixDespesas");
const PixDespesaRealRange      = despesasPixTab.getRange("PixDespesaReal");
const PixDespesaOuroRange      = despesasPixTab.getRange("PixDespesaOuro");
const PixDespesaTotalRealRange = despesasPixTab.getRange("PixDespesaTotalReal");
const PixDespesaTotalOuroRange = despesasPixTab.getRange("PixDespesaTotalOuro");

const PixMoedaRange 	      = despesasPixTab.getRange("PixMoeda");
const PixSaldoOuroRange 	  = despesasPixTab.getRange("PixSaldoOuro");
const PixSaldoRealRange 	  = despesasPixTab.getRange("PixSaldoReal");
const PixFuturoOuroRange 	  = despesasPixTab.getRange("PixFuturoOuro");
const PixFuturoRealRange 	  = despesasPixTab.getRange("PixFuturoReal");

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
const DiversosSaldoOuroRange     = despesasDiversosTab.getRange("DiversosSaldoOuro");
const DiversosSaldoRealRange     = despesasDiversosTab.getRange("DiversosSaldoReal");
const DiversosFuturoOuroRange 	= despesasDiversosTab.getRange("DiversosFuturoOuro");
const DiversosFuturoRealRange 	= despesasDiversosTab.getRange("DiversosFuturoReal");

const DiversosItemsRange = despesasDiversosTab.getRange("DiversosItems");
const DiversosRealRange = despesasDiversosTab.getRange("DiversosReal");
const DiversosQuantidadesRange = despesasDiversosTab.getRange("DiversosQuantidades");

const DiversosDespesasItemCol        = 0;  
const DiversosDespesasRealCol        = 1;
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
const FolgaSaldoOuroRange          = despesasFolgaTab.getRange("FolgaSaldoOuro");
const FolgaSaldoRealRange          = despesasFolgaTab.getRange("FolgaSaldoReal");
const FolgaFuturoOuroRange 	       = despesasFolgaTab.getRange("FolgaFuturoOuro");
const FolgaFuturoRealRange 	       = despesasFolgaTab.getRange("FolgaFuturoReal");

const FolgaItemsRange = despesasFolgaTab.getRange("FolgaItems");
const FolgaRealRange = despesasFolgaTab.getRange("FolgaReal");
const FolgaQuantidadesRange = despesasFolgaTab.getRange("FolgaQuantidades");

const FolgaDespesasItemCol        = 0;  
const FolgaDespesasRealol         = 1;
const FolgaDespesasOuroCol        = 2;  
const FolgaDespesasQTDCol         = 3
const FolgaDespesasTotalRealCol   = 4;
const FolgaDespesasTotaOurolCol   = 5;

// *** Layout do formulário Cambio
// 
const despesasCambioTab = despesasSpreadSheet.getSheetByName("Cambio");

const CambioDataRange        = despesasCambioTab.getRange("CambioData");
const CambioColaboradorRange = despesasCambioTab.getRange("CambioColaborador");
const CambioEstadiaRange     = despesasCambioTab.getRange("CambioEstadia");
const CambioPagementoRange   = despesasCambioTab.getRange("CambioPagamento");
const CambioComentarioRange  = despesasCambioTab.getRange("CambioComentario");

const CambioDespesasRange    	  = despesasCambioTab.getRange("CambioDespesas");
const CambioDespesaRealRange      = despesasCambioTab.getRange("CambioDespesaReal");
const CambioDespesaOuroRange      = despesasCambioTab.getRange("CambioDespesaOuro");
const CambioDespesaTotalRealRange = despesasCambioTab.getRange("CambioDespesaTotalReal");
const CambioDespesaTotalOuroRange = despesasCambioTab.getRange("CambioDespesaTotalOuro");

const CambioMoedaRange 	    = despesasCambioTab.getRange("CambioMoeda");
const CambioSaldoOuroRange 	= despesasCambioTab.getRange("CambioSaldoOuro");
const CambioSaldoRealRange  = despesasCambioTab.getRange("CambioSaldoReal");
const CambioFuturoOuroRange = despesasCambioTab.getRange("CambioFuturoOuro");
const CambioFuturoRealRange = despesasCambioTab.getRange("CambioFuturoReal");

const CambioDespesasItemCol        = 0;  
const CambioDespesasRealCol        = 1;
const CambioDespesasOuroCol        = 2;  
const CambioDespesasQTDCol         = 3
const CambioDespesasTotalRealCol   = 4;
const CambioDespesasTotaOurolCol   = 5;

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

const ESTADIAS_GAMA        = "EstadiaGamaLocal";
const ESTADIAS_NOME        = 0;
const ESTADIAS_INICIO      = 1;
const ESTADIAS_METODO      = 2;
const ESTADIAS_SETOR       = 3;
const ESTADIAS_LOCAL       = 4;
const ESTADIAS_TAREFA      = 5;
const ESTADIAS_REMUNERACAO = 6;
const ESTADIAS_COMENTARIOS = 7;

function GetSaldo() {
  // sheetName = "Cantina"
  let  colaboradorNome;
  let  colaboradoEstadia;
  let  saldoOuroRange;
  let  saldoRealRange;
  let  futuroOuroRange;
  let  futuroRealRange;

  let ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheetName = ss.getActiveSheet().getName();
  switch (sheetName) {
    case "Cantina":
      colaboradorNome   = CantinaColaboradorRange.getValue();
      colaboradoEstadia = CantinaEstadiaRange.getValue();
      saldoOuroRange    = CantinaSaldoOuroRange;
      saldoRealRange    = CantinaSaldoRealRange;
      futuroOuroRange   = CantinaFuturoOuroRange;
      futuroRealRange   = CantinaFuturoRealRange;
      break;
    case "Pix":
      colaboradorNome   = PixColaboradorRange.getValue();
      colaboradoEstadia = PixEstadiaRange.getValue();
      saldoOuroRange    = PixSaldoOuroRange;
      saldoRealRange    = PixSaldoRealRange;
      futuroOuroRange   = PixFuturoOuroRange;
      futuroRealRange   = PixFuturoRealRange;
      break;
    case "Diversos":
      colaboradorNome   = DiversosColaboradorRange.getValue();
      colaboradoEstadia = DiversosEstadiaRange.getValue();
      saldoOuroRange    = DiversosSaldoOuroRange;
      saldoRealRange    = DiversosSaldoRealRange;
      futuroOuroRange   = DiversosFuturoOuroRange;
      futuroRealRange   = DiversosFuturoRealRange;
      break;
    case "Cambio":
      colaboradorNome   = CambioColaboradorRange.getValue();
      colaboradoEstadia = CambioEstadiaRange.getValue();
      saldoOuroRange    = CambioSaldoOuroRange;
      saldoRealRange    = CambioSaldoRealRange;
      futuroOuroRange   = CambioFuturoOuroRange;
      futuroRealRange   = CambioFuturoRealRange;
      break;    default:
      return {
        auferidas: {
          ouro: 0,
          real: 0
        },
        futuras: {
          ouro: 0,
          real: 0
        }
      };
  }
	let rendas = CararaLibrary.calcularSaldoContasCorrentes(colaboradorNome, CararaLibrary.dateToString(colaboradoEstadia));
	if (rendas != null) {
    saldoOuroRange.setValue(rendas.auferidas.ouro );
    saldoRealRange.setValue(rendas.auferidas.real);
    futuroOuroRange.setValue(rendas.futuras.ouro);
    futuroRealRange.setValue(rendas.futuras.real);
  }
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