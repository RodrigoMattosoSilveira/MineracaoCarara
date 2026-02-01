// *** Identificação da folhas das Despesas
// 
const despesasID          = "1XwjBUJYG4VLN0ZaG0EFzKljWk9VdGvePaDO9Nwd70G4";
let despesasSpreadSheet  = SpreadsheetApp.openById(despesasID);;

// *** Formulário Cantina
// 
let despesasCantinaTab;
let CantinaDataRange;

const CantinaDespesasItemCol        = 0;    
const CantinaDespesasRealol         = 1;
const CantinaDespesasOuroCol        = 2;    
const CantinaDespesasQTDCol         = 3
const CantinaDespesasTotalRealCol   = 4;
const CantinaDespesasTotaOurolCol   = 5;

let CantinaColaboradorRange;
let CantinaEstadiaRange;
let CantinaPagementoRange;
let CantinaMoedaRange;
let CantinaDespesasRange;
let CantinaComentarioRange;
let CantinaSaldoOuroRange;
let CantinaSaldoRealRange;
let CantinaFuturoOuroRange;
let CantinaFuturoRealRange;

let CantinaItemsRange;
let CantinaQuantidadesRange;

const SetUpCantina = () => {

  
  if (typeof despesasCantinaTab === "undefined") {
    despesasCantinaTab       = despesasSpreadSheet.getSheetByName("Cantina");
    CantinaDataRange         = despesasCantinaTab.getRange("CantinaData");

    CantinaColaboradorRange  = despesasCantinaTab.getRange("CantinaColaborador");
    CantinaEstadiaRange      = despesasCantinaTab.getRange("CantinaEstadia");
    CantinaPagementoRange    = despesasCantinaTab.getRange("CantinaPagemento");
    CantinaMoedaRange        = despesasCantinaTab.getRange("CantinaMoeda");
    CantinaDespesasRange     = despesasCantinaTab.getRange("CantinaDespesas");
    CantinaComentarioRange   = despesasCantinaTab.getRange("CantinaComentario");
    CantinaSaldoOuroRange    = despesasCantinaTab.getRange("CantinaSaldoOuro");
    CantinaSaldoRealRange    = despesasCantinaTab.getRange("CantinaSaldoReal");
    CantinaFuturoOuroRange   = despesasCantinaTab.getRange("CantinaFuturoOuro");
    CantinaFuturoRealRange   = despesasCantinaTab.getRange("CantinaFuturoReal");

    CantinaItemsRange = despesasCantinaTab.getRange("CantinaItems");
    CantinaQuantidadesRange = despesasCantinaTab.getRange("CantinaQuantidades");
  }

};


// *** Layout do formulário PIX
// 
const PixDespesasItemCol        = 0;  
const PixDespesasRealol         = 1;
const PixDespesasOuroCol        = 2;  
const PixDespesasQTDCol         = 3
const PixDespesasTotalRealCol   = 4;
const PixDespesasTotaOurolCol   = 5;

let despesasPixTab;

let PixDataRange;
let PixColaboradorRange;
let PixEstadiaRange;
let PixPagementoRange;
let PixComentarioRange;

let PixDespesasRange;
let PixDespesaRealRange;
let PixDespesaOuroRange;
let PixDespesaTotalRealRange;
let PixDespesaTotalOuroRange;

let PixMoedaRange;
let PixSaldoOuroRange;
let PixSaldoRealRange;
let PixFuturoOuroRange;
let PixFuturoRealRange;

function SetUpPix() {
  if (typeof despesasPixTab === "undefined") { 
    despesasPixTab          = despesasSpreadSheet.getSheetByName("Pix");
    PixDataRange            = despesasPixTab.getRange("PixData");
    PixColaboradorRange     = despesasPixTab.getRange("PixColaborador");
    PixEstadiaRange         = despesasPixTab.getRange("PixEstadia");
    PixPagementoRange       = despesasPixTab.getRange("PixPagamento");
    PixComentarioRange      = despesasPixTab.getRange("PixComentario");

    PixDespesasRange         = despesasPixTab.getRange("PixDespesas");
    PixDespesaRealRange      = despesasPixTab.getRange("PixDespesaReal");
    PixDespesaOuroRange      = despesasPixTab.getRange("PixDespesaOuro");
    PixDespesaTotalRealRange = despesasPixTab.getRange("PixDespesaTotalReal");
    PixDespesaTotalOuroRange = despesasPixTab.getRange("PixDespesaTotalOuro");

    PixMoedaRange           = despesasPixTab.getRange("PixMoeda");
    PixSaldoOuroRange       = despesasPixTab.getRange("PixSaldoOuro");
    PixSaldoRealRange       = despesasPixTab.getRange("PixSaldoReal");
    PixFuturoOuroRange      = despesasPixTab.getRange("PixFuturoOuro");
    PixFuturoRealRange      = despesasPixTab.getRange("PixFuturoReal");
  }
}

// *** Layout do formulário Diversos
// 
const DiversosDespesasItemCol        = 0;  
const DiversosDespesasRealCol        = 1;
const DiversosDespesasOuroCol        = 2;  
const DiversosDespesasQTDCol         = 3
const DiversosDespesasTotalRealCol   = 4;
const DiversosDespesasTotalOuroCol   = 5;
let despesasDiversosTab;

let DiversosDataRange;
let DiversosColaboradorRange;
let DiversosEstadiaRange;
let DiversosPagementoRange;
let DiversosMoedaRange;
let DiversosDespesasRange;
let DiversosComentarioRange;
let DiversosSaldoOuroRange;
let DiversosSaldoRealRange;
let DiversosFuturoOuroRange;
let DiversosFuturoRealRange;

let DiversosItemsRange;
let DiversosRealRange;
let DiversosQuantidadesRange;   

function SetUpDiversos() {
  if (typeof despesasDiversosTab === "undefined") { 
    despesasDiversosTab       = despesasSpreadSheet.getSheetByName("Diversos");
    DiversosDataRange         = despesasDiversosTab.getRange("DiversosData");

    DiversosColaboradorRange   = despesasDiversosTab.getRange("DiversosColaborador");
    DiversosEstadiaRange       = despesasDiversosTab.getRange("DiversosEstadia");
    DiversosPagementoRange     = despesasDiversosTab.getRange("DiversosPagamento");
    DiversosMoedaRange         = despesasDiversosTab.getRange("DiversosMoeda");
    DiversosDespesasRange      = despesasDiversosTab.getRange("DiversosDespesas");
    DiversosComentarioRange    = despesasDiversosTab.getRange("DiversosComentario");
    DiversosSaldoOuroRange     = despesasDiversosTab.getRange("DiversosSaldoOuro");
    DiversosSaldoRealRange     = despesasDiversosTab.getRange("DiversosSaldoReal");
    DiversosFuturoOuroRange   = despesasDiversosTab.getRange("DiversosFuturoOuro");
    DiversosFuturoRealRange   = despesasDiversosTab.getRange("DiversosFuturoReal");

    DiversosItemsRange = despesasDiversosTab.getRange("DiversosItems");
    DiversosRealRange = despesasDiversosTab.getRange("DiversosReal");
    DiversosQuantidadesRange = despesasDiversosTab.getRange("DiversosQuantidades");
  }
}



// *** Layout do formulário Folga
// 

const FolgaDespesasItemCol        = 0;  
const FolgaDespesasRealCol        = 1;
const FolgaDespesasOuroCol        = 2;  
const FolgaDespesasQTDCol         = 3
const FolgaDespesasTotalRealCol   = 4;
const FolgaDespesasTotaOurolCol   = 5;

let despesasFolgaTab;
let FolgaDataRange;

let FolgaColaboradorRange;
let FolgaEstadiaRange;
let FolgaPagementoRange;
let FolgaMoedaRange;
let FolgaDespesasRange;
let FolgaSubstituidoRange;
let FolgaSubstituidoDiariaRange;
let FolgaComentarioRange;
let FolgaSaldoOuroRange;
let FolgaSaldoRealRange;
let FolgaFuturoOuroRange;
let FolgaFuturoRealRange;

let FolgaItemsRange;
let FolgaRealRange;
let FolgaQuantidadesRange;
;
function SetupFolga() {
  if (typeof despesasFolgaTab === "undefined") { 
    despesasFolgaTab       = despesasSpreadSheet.getSheetByName("Folga");
    FolgaDataRange         = despesasFolgaTab.getRange("FolgaData");

    FolgaColaboradorRange        = despesasFolgaTab.getRange("FolgaColaborador");
    FolgaEstadiaRange            = despesasFolgaTab.getRange("FolgaEstadia");
    FolgaPagementoRange          = despesasFolgaTab.getRange("FolgaPagamento");
    FolgaMoedaRange              = despesasFolgaTab.getRange("FolgaMoeda");
    FolgaDespesasRange           = despesasFolgaTab.getRange("FolgaDespesas");
    FolgaSubstituidoRange        = despesasFolgaTab.getRange("FolgaSubstituido");
    FolgaSubstituidoDiariaRange  = despesasFolgaTab.getRange("FolgaSubstituidoDiaria"); 
    FolgaComentarioRange         = despesasFolgaTab.getRange("FolgaComentario");

    FolgaSaldoOuroRange          = despesasFolgaTab.getRange("FolgaSaldoOuro");
    FolgaSaldoRealRange          = despesasFolgaTab.getRange("FolgaSaldoReal");
    FolgaFuturoOuroRange         = despesasFolgaTab.getRange("FolgaFuturoOuro");
    FolgaFuturoRealRange         = despesasFolgaTab.getRange("FolgaFuturoReal");

    FolgaItemsRange = despesasFolgaTab.getRange("FolgaItems");
    FolgaRealRange = despesasFolgaTab.getRange("FolgaReal");
    FolgaQuantidadesRange = despesasFolgaTab.getRange("FolgaQuantidades");
  }
}



// *** Layout do formulário Cambio
// 
const CambioDespesasItemCol        = 0;  
const CambioDespesasRealCol        = 1;
const CambioDespesasOuroCol        = 2;  
const CambioDespesasQTDCol         = 3
const CambioDespesasTotalRealCol   = 4;
const CambioDespesasTotaOurolCol   = 5;

let despesasCambioTab;

let CambioDataRange;
let CambioColaboradorRange;
let CambioEstadiaRange;
let CambioPagementoRange;
let CambioComentarioRange;

let CambioDespesasRange;
let CambioDespesaRealRange;
let CambioDespesaOuroRange;
let CambioDespesaTotalRealRange;
let CambioDespesaTotalOuroRange;

let CambioMoedaRange;
let CambioSaldoOuroRange;
let CambioSaldoRealRange;
let CambioFuturoOuroRange;
let CambioFuturoRealRange;

function SetupCambio() {  
  if (typeof despesasCambioTab === "undefined") { 
    despesasCambioTab = despesasSpreadSheet.getSheetByName("Cambio");

    CambioDataRange        = despesasCambioTab.getRange("CambioData");
    CambioColaboradorRange = despesasCambioTab.getRange("CambioColaborador");
    CambioEstadiaRange     = despesasCambioTab.getRange("CambioEstadia");
    CambioPagementoRange   = despesasCambioTab.getRange("CambioPagamento");
    CambioComentarioRange  = despesasCambioTab.getRange("CambioComentario");

    CambioDespesasRange         = despesasCambioTab.getRange("CambioDespesas");
    CambioDespesaRealRange      = despesasCambioTab.getRange("CambioDespesaReal");
    CambioDespesaOuroRange      = despesasCambioTab.getRange("CambioDespesaOuro");
    CambioDespesaTotalRealRange = despesasCambioTab.getRange("CambioDespesaTotalReal");
    CambioDespesaTotalOuroRange = despesasCambioTab.getRange("CambioDespesaTotalOuro");

    CambioMoedaRange      = despesasCambioTab.getRange("CambioMoeda");
    CambioSaldoOuroRange  = despesasCambioTab.getRange("CambioSaldoOuro");
    CambioSaldoRealRange  = despesasCambioTab.getRange("CambioSaldoReal");
    CambioFuturoOuroRange = despesasCambioTab.getRange("CambioFuturoOuro");
    CambioFuturoRealRange = despesasCambioTab.getRange("CambioFuturoReal");
  }
}


// *** Layout do formulário Fechar
// 
const FecharDespesasItemCol        = 0;  
const FecharDespesasRealol         = 1;
const FecharDespesasOuroCol        = 2;  
const FecharDespesasQTDCol         = 3
const FecharDespesasTotalRealCol   = 4;
const FecharDespesasTotaOurolCol   = 5;

let despesasFecharTab;

let FecharDataRange;
let FecharColaboradorRange;
let FecharEstadiaRange;
let FecharComentarioRange;

let FecharDadosRange;

let FecharSaldoOuroRange;
let FecharSaldoRealRange;
let FecharFuturoOuroRange;
let FecharFuturoRealRange;

function SetupFechar() {  
  if (typeof despesasFecharTab === "undefined") { 
    despesasFecharTab = despesasSpreadSheet.getSheetByName("Fechar");

    FecharDataRange        = despesasFecharTab.getRange("FecharData");
    FecharColaboradorRange = despesasFecharTab.getRange("FecharColaborador");
    FecharEstadiaRange     = despesasFecharTab.getRange("FecharEstadia");
    FecharComentarioRange  = despesasFecharTab.getRange("FecharComentario");

    FecharDadosRange         = despesasFecharTab.getRange("FecharDados");
    // FecharDespesaRealRange      = despesasFecharTab.getRange("FecharDespesaReal");
    // FecharDespesaOuroRange      = despesasFecharTab.getRange("FecharDespesaOuro");
    // FecharDespesaTotalRealRange = despesasFecharTab.getRange("FecharDespesaTotalReal");
    // FecharDespesaTotalOuroRange = despesasFecharTab.getRange("FecharDespesaTotalOuro");

    // FecharMoedaRange      = despesasFecharTab.getRange("FecharMoeda");
    FecharSaldoOuroRange  = despesasFecharTab.getRange("FecharSaldoOuro");
    FecharSaldoRealRange  = despesasFecharTab.getRange("FecharSaldoReal");
    FecharFuturoOuroRange = despesasFecharTab.getRange("FecharFuturoOuro");
    FecharFuturoRealRange = despesasFecharTab.getRange("FecharFuturoReal");
  }
}

// *** Identificação da Sheet Contas Correntes
// 
const contasCorrentesId                     = "10QXCS1QspqKH8owJQiazFc1dSumWy94mgHIVhZargcA";
const contasCorrentesSheet                  = SpreadsheetApp.openById(contasCorrentesId);
const contasCorrentesTab                    = contasCorrentesSheet.getSheetByName("ContasCorrentes");
const contasCorrentesDadosTab               = contasCorrentesSheet.getSheetByName("Dados");
// const contasCorrentesDadosRange          = contasCorrentesDadosTab.getRange("Dados");

const contasCorrentesDataCol                = 0;
const contasCorrentesNomeCol                = 1;
const contasCorrentesEstadiaCol             = 2;
const contasCorrentesMetodoCol              = 3;  // Diaria, Salario, Porcentagem, Cantina, PIX, Diversos, Voo, Fechar, substitua por outro
const contasCorrentesMoedaCol               = 4   // Real, Ouro
const contasCorrentesCreditDebitCol         = 5;  // Credito, Debito
const contasCorrentesItemCol                = 6;
const contasCorrentesPrecoUnidadeRealCol    = 7;  // Real
const contasCorrentesPrecoUnidadeOuroCol    = 8;  // Gramas de Ouro 
const contasCorrentesItemQtdCol             = 9;
const contasCorrentesTotalRealCol           = 10; // Real
const contasCorrentesTotalOuroCol           = 11; // Gramas de Ouro
const contasCorrentesComentariosCol         = 12

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
      SetUpCantina();
      colaboradorNome   = CantinaColaboradorRange.getValue();
      colaboradoEstadia = CantinaEstadiaRange.getValue();
      saldoOuroRange    = CantinaSaldoOuroRange;
      saldoRealRange    = CantinaSaldoRealRange;
      futuroOuroRange   = CantinaFuturoOuroRange;
      futuroRealRange   = CantinaFuturoRealRange;
      break;
    case "Pix":
      SetUpPix();
      colaboradorNome   = PixColaboradorRange.getValue();
      colaboradoEstadia = PixEstadiaRange.getValue();
      saldoOuroRange    = PixSaldoOuroRange;
      saldoRealRange    = PixSaldoRealRange;
      futuroOuroRange   = PixFuturoOuroRange;
      futuroRealRange   = PixFuturoRealRange;
      break;
    case "Diversos":
      SetUpDiversos();
      colaboradorNome   = DiversosColaboradorRange.getValue();
      colaboradoEstadia = DiversosEstadiaRange.getValue();
      saldoOuroRange    = DiversosSaldoOuroRange;
      saldoRealRange    = DiversosSaldoRealRange;
      futuroOuroRange   = DiversosFuturoOuroRange;
      futuroRealRange   = DiversosFuturoRealRange;
      break;
    case "Folga":
       SetupFolga();
      colaboradorNome   = FolgaColaboradorRange.getValue();
      colaboradoEstadia = FolgaEstadiaRange.getValue();
      saldoOuroRange    = FolgaSaldoOuroRange;
      saldoRealRange    = FolgaSaldoRealRange;
      futuroOuroRange   = FolgaFuturoOuroRange;
      futuroRealRange   = FolgaFuturoRealRange;
      break;
    case "Cambio":
      SetupCambio();
      colaboradorNome   = CambioColaboradorRange.getValue();
      colaboradoEstadia = CambioEstadiaRange.getValue();
      saldoOuroRange    = CambioSaldoOuroRange;
      saldoRealRange    = CambioSaldoRealRange;
      futuroOuroRange   = CambioFuturoOuroRange;
      futuroRealRange   = CambioFuturoRealRange;
      break;    
    case "Fechar":
      SetupFechar();
      colaboradorNome   = FecharColaboradorRange.getValue();
      colaboradoEstadia = FecharEstadiaRange.getValue();
      saldoOuroRange    = FecharSaldoOuroRange;
      saldoRealRange    = FecharSaldoRealRange;
      futuroOuroRange   = FecharFuturoOuroRange;
      futuroRealRange   = FecharFuturoRealRange;
      break;    
   default:
      return {
        auferidas: {
          Ouro: 0,
          Real: 0
        },
        futuras: {
          Ouro: 0,
          Real: 0
        }
      };
  }
    let rendas = CararaLibrary.calcularSaldoContasCorrentes(colaboradorNome, CararaLibrary.dateToString(colaboradoEstadia));
    if (rendas != null) {
    saldoOuroRange.setValue(rendas.auferidas.Ouro );
    saldoRealRange.setValue(rendas.auferidas.Real);
    futuroOuroRange.setValue(rendas.futuras.Ouro);
    futuroRealRange.setValue(rendas.futuras.Real);
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

