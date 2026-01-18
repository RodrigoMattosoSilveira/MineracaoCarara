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
const CambioDespesasRealol         = 1;
const CambioDespesasOuroCol        = 2;  
const CambioDespesasQTDCol         = 3
const CambioDespesasTotalRealCol   = 4;
const CambioDespesasTotaOurolCol   = 5;