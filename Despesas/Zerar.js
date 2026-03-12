// *** Layout do formulário Zerar
// 
const ZerarDespesasItemCol        = 0;  
const ZerarDespesasRealol         = 1;
const ZerarDespesasOuroCol        = 2;  
const ZerarDespesasQTDCol         = 3
const ZerarDespesasTotalRealCol   = 4;
const ZerarDespesasTotaOurolCol   = 5;

let despesasZerarTab;

let ZerarDataRange;
let ZerarColaboradorRange;
let ZerarEstadiaRange;
let ZerarComentarioRange;

let ZerarDadosRange;

let ZerarSaldoOuroRange;
let ZerarSaldoRealRange;
let ZerarFuturoOuroRange;
let ZerarFuturoRealRange;

function SetupZerar() {  
  if (typeof despesasZerarTab === "undefined") { 
    despesasZerarTab = despesasSpreadSheet.getSheetByName("Zerar");

    ZerarDataRange        = despesasZerarTab.getRange("ZerarData");
    ZerarColaboradorRange = despesasZerarTab.getRange("ZerarColaborador");
    ZerarEstadiaRange     = despesasZerarTab.getRange("ZerarEstadia");
    ZerarComentarioRange  = despesasZerarTab.getRange("ZerarComentario");

    ZerarDadosRange         = despesasZerarTab.getRange("ZerarDados");
    // ZerarDespesaRealRange      = despesasZerarTab.getRange("ZerarDespesaReal");
    // ZerarDespesaOuroRange      = despesasZerarTab.getRange("ZerarDespesaOuro");
    // ZerarDespesaTotalRealRange = despesasZerarTab.getRange("ZerarDespesaTotalReal");
    // ZerarDespesaTotalOuroRange = despesasZerarTab.getRange("ZerarDespesaTotalOuro");

    // ZerarMoedaRange      = despesasZerarTab.getRange("ZerarMoeda");
    ZerarSaldoOuroRange  = despesasZerarTab.getRange("ZerarSaldoOuro");
    ZerarSaldoRealRange  = despesasZerarTab.getRange("ZerarSaldoReal");
    ZerarFuturoOuroRange = despesasZerarTab.getRange("ZerarFuturoOuro");
    ZerarFuturoRealRange = despesasZerarTab.getRange("ZerarFuturoReal");
  }
}

function zerarPrepare() {
  // Navegue para o formulário Zerar e limpe o mesmo
  CararaLibrary.activateSheet("Zerar");
  SetupZerar();
  limparFormularioZerar();

  // Prencha os saldos atuais do colaborador
  GetSaldo(); 

  // Preencha a descrição dos pagementos a serem feitos
  zerarPrepareCompletar();
}

function zerarPrepareCompletar() {
  // Build Conta Corrent records
  const ZerarData        = ZerarDataRange.getValue();
  const ZerarColaborador = ZerarColaboradorRange.getValue();
  const ZerarEstadia     = ZerarEstadiaRange.getValue();
  const ZerarComentario  = ZerarComentarioRange.getValue();

  // Obtenha os saldos de Reais e Ouro do colaborador
  let saldoOuro = ZerarSaldoOuroRange.getValue();

  if (saldoOuro == 0) {
    SpreadsheetApp.getUi().alert("Nao ha nehum saldo em ouro a ser zerado para o colaborador " + ZerarColaborador);
    return null;
  }

  if (saldoOuro < 0) {
    SpreadsheetApp.getUi().alert("A conta não pode ser zerada com saldo em ouro negativos " + ZerarColaborador);
    return null;
  }

  //  Obtenha e preencha a area do formularon a incluir as informations a
  // cerca dos debitos e creditos docolaborador
  let zerarDadosRangeVals = ZerarDadosRange.getValues();
  let i = 0;

  if (saldoOuro > 0) {
    let roundedOuro = CararaLibrary.roundToDecimals(saldoOuro, 8)
    zerarDadosRangeVals[i][0]  = 'A Mineração Carará pagou ao Colaborador seu credito em Ouro, ' + roundedOuro + 'g';
    i++
  }
  ZerarDadosRange.setValues(zerarDadosRangeVals).setFontSize(14);

  // despesasSpreadSheet.getRangeByName("ZerarSemaforo").setBackground("#00FF00");
}

function zerarExecute() {
  switchToTab("Zerar");
  SetupZerar();

  if (ZerarColaboradorRange.getValue() == "") {
    SpreadsheetApp.getUi().alert("O Colaboradordeve ser preenchido.");
    return null;
  }

  let ZerarData        = ZerarDataRange.getValue();
  let ZerarColaborador = ZerarColaboradorRange.getValue();
  let ZerarEstadia     = ZerarEstadiaRange.getValue();
  let ZerarComentario  = ZerarComentarioRange.getValue();
  let saldoOuro        = ZerarSaldoOuroRange.getValue();

  if (saldoOuro < 0) {
    SpreadsheetApp.getUi().alert("A conta não pode ser encerrada com saldo em ouro negativo " + ZerarColaborador);
    return null;
  }
  if (saldoOuro == 0) {
    SpreadsheetApp.getUi().alert("Nao ha nehum saldo em ouro a ser zerado para o colaborador " + ZerarColaborador);
    return null;
  }
  // Compute os registros de contas correntes
  var contaCorrente = [];
  var contaCorrenteRegistro;

  if (saldoOuro > 0) {
    var item =  'A Mineração Carará pagou ao Colaborador seu credito em Ouro';
    var contaCorrenteRegistro = fillUpRegister (ZerarData, ZerarColaborador, ZerarEstadia, 'Ouro', 'Debito', item, saldoOuro, ZerarComentario);
    contaCorrente.push(contaCorrenteRegistro)
  }

  if (contaCorrente.length == 0) {
    SpreadsheetApp.getUi().alert("Nao ha nehum saldo a ser zerado para o colaborador " + ZerarColaborador);
    return null;
  }
  var lastRow = contasCorrentesDadosTab.getLastRow();
  contasCorrentesDadosTab.getRange(lastRow + 1, 1, contaCorrente.length, contaCorrente[0].length).setValues(contaCorrente)

  SpreadsheetApp.getUi() // Or DocumentApp, SlidesApp or FormApp.
    .alert('O sistema zerou a conta em ouro de ' + ZerarColaborador);
} 

/**
 * Preencha o registro the contas correntes
 * 
 * @param {Date}   data
 * @param {string} associado
 * @param {Date}   estadia
 * @param {string} moeda
 * @param {String} creditoOuDebito
 * @param {String} item
 * @param {Float}  valor
 * @returns {Array} contaCorrenteRegistro
 * *************************************************************************** */
// TODO refactor all Despesa sheets to use the same fillUpRegister
function fillUpRegister (data,colaborador, estadia, moeda, cOrD, item, valor, zerarComentario) {
  var contaCorrenteRegistro = [];
  contaCorrenteRegistro[contasCorrentesDataCol]           = data;
  contaCorrenteRegistro[contasCorrentesNomeCol]           =colaborador
  contaCorrenteRegistro[contasCorrentesEstadiaCol]        = estadia
  contaCorrenteRegistro[contasCorrentesMetodoCol]         = 'Zerar';
  contaCorrenteRegistro[contasCorrentesMoedaCol]          = moeda
  contaCorrenteRegistro[contasCorrentesCreditDebitCol]    = cOrD
  contaCorrenteRegistro[contasCorrentesItemCol]           = item
  contaCorrenteRegistro[contasCorrentesItemQtdCol]          = 1;
  switch (moeda) {
    case "Ouro": 
      contaCorrenteRegistro[contasCorrentesPrecoUnidadeRealCol]   = 0
      contaCorrenteRegistro[contasCorrentesPrecoUnidadeOuroCol]   = valor;
      contaCorrenteRegistro[contasCorrentesTotalRealCol]          = 0
      contaCorrenteRegistro[contasCorrentesTotalOuroCol]          = valor;
      break;
	default:
		SpreadsheetApp.getUi().alert("Tentativa inválida de zerar uma conta usando " + moeda);
  }
  contaCorrenteRegistro[contasCorrentesComentariosCol]    = zerarComentario;
  return contaCorrenteRegistro
}

function limparFormularioZerar() {
  ZerarSaldoOuroRange.setValue("");
  ZerarSaldoRealRange.setValue("");
  ZerarFuturoOuroRange.setValue("");
  ZerarFuturoRealRange.setValue("");

  ZerarDadosRange.setValue("");

  ZerarComentarioRange.setValue("");
  GetSaldo();
}