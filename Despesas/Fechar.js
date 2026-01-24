function fecharPrepare() {
  // Navegue para o formulário Diversos e limpe o mesmo
  CararaLibrary.activateSheet("Fechar");
  SetupFechar();
  limparFormularioFechar();

  // Prencha os saldos atuais do colaborador
  GetSaldo(); 

  // Preencha a descrição dos pagementos a serem feitos
  fecharPrepareCompletar();
}

function fecharPrepareCompletar() {
  // Build Conta Corrent records
  const FecharData        = FecharDataRange.getValue();
  const FecharColaborador = FecharColaboradorRange.getValue();
  const FecharEstadia     = FecharEstadiaRange.getValue();
  const FecharComentario  = FecharComentarioRange.getValue();

  // Obtenha os saldos de Reais e Ouro do colaborador
  let saldoOuro = FecharSaldoOuroRange.getValue();
  let saldoReal = FecharSaldoRealRange.getValue();

  if (saldoOuro == 0 && saldoReal == 0) {
    SpreadsheetApp.getUi().alert("Nao ha nehum saldo a ser fechado para o colaborador " + FecharColaborador);
    return null;
  }

  if (saldoOuro < 0 || saldoReal < 0) {
    SpreadsheetApp.getUi().alert("A conta não pode ser encerrada com saldos negativos " + FecharColaborador);
    return null;
  }

  //  Obtenha e preencha a area do formularon a incluir as informations a
  // cerca dos debitos e creditos docolaborador
  let fecharDadosRangeVals = FecharDadosRange.getValues();
  let i = 0;
  if (saldoReal > 0) {
    let formattedPrice = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(saldoReal);
    fecharDadosRangeVals[i][0] = 'A Mineração Carará pagou ao Colaborador seu credito em Real, ' + formattedPrice;
    i++
  }
  if (saldoOuro > 0) {
    let roundedOuro = CararaLibrary.roundToDecimals(saldoOuro, 8)
    fecharDadosRangeVals[i][0]  = 'A Mineração Carará pagou ao Colaborador seu credito em Ouro, ' + roundedOuro + 'g';
    i++
  }
  FecharDadosRange.setValues(fecharDadosRangeVals).setFontSize(14);

  // despesasSpreadSheet.getRangeByName("FecharSemaforo").setBackground("#00FF00");
}

function fecharExecute() {
  switchToTab("Fechar");
  SetupFechar();

  if (FecharColaboradorRange.getValue() == "") {
    SpreadsheetApp.getUi().alert("O Colaboradordeve ser preenchido.");
    return null;
  }

  let FecharData       = FecharDataRange.getValue();
  let FecharColaborador= FecharColaboradorRange.getValue();
  let FecharEstadia    = FecharEstadiaRange.getValue();
  let FecharComentario = FecharComentarioRange.getValue();
  let saldoOuro = FecharSaldoOuroRange.getValue();
  let saldoReal = FecharSaldoRealRange.getValue();

  if (saldoOuro < 0 || saldoReal < 0) {
    SpreadsheetApp.getUi().alert("A conta não pode ser encerrada com saldos negativos " + FecharColaborador);
    return null;
  }
  if (saldoOuro == 0 && saldoReal == 0) {
    SpreadsheetApp.getUi().alert("Nao ha nehum saldo a ser fechado para o colaborador " + FecharColaborador);
    return null;
  }
  // Compute os registros de contas correntes
  var contaCorrente = [];
  var contaCorrenteRegistro;
  if (saldoReal > 0) {
    var item =  'A Mineração Carará pagou ao Colaboradorseu credito em Real';
    contaCorrenteRegistro = fillUpRegister (FecharData, FecharColaborador, FecharEstadia, 'Real', 'Debito', item, saldoReal, FecharComentario);
    contaCorrente.push(contaCorrenteRegistro)
  }

  if (saldoOuro > 0) {
    var item =  'A Mineração Carará pagou ao Colaboradorseu credito em Ouro';
    var contaCorrenteRegistro = fillUpRegister (FecharData, FecharColaborador, FecharEstadia, 'Ouro', 'Debito', item, saldoOuro, FecharComentario);
    contaCorrente.push(contaCorrenteRegistro)
  }

  if (contaCorrente.length == 0) {
    SpreadsheetApp.getUi().alert("Nao ha nehum saldo a ser fechado para o colaborador " + FecharColaborador);
    return null;
  }
  var lastRow = contasCorrentesDadosTab.getLastRow();
  contasCorrentesDadosTab.getRange(lastRow + 1, 1, contaCorrente.length, contaCorrente[0].length).setValues(contaCorrente)
    
  removerColaborador(FecharColaborador);

  SpreadsheetApp.getUi() // Or DocumentApp, SlidesApp or FormApp.
    .alert('O sistema fechou a conta de ' + FecharColaborador);
} 

// ****************************************************************************
// fillUpRegister - Preencha o registro the contas correntes
// 
// Input
//    data (Date)
//    associado (string)
//    estadia (Date)
//    moeda (String)
//    creditoOuDebito (String)
//    item (String)
//    valor (Float)
// Output
//    contaCorrenteRegistro (Array)
// ****************************************************************************
// 
function fillUpRegister (data,colaborador, estadia, moeda, cOrD, item, valor, fecharComentario) {
  var contaCorrenteRegistro = [];
  contaCorrenteRegistro[contasCorrentesDataCol]           = data;
  contaCorrenteRegistro[contasCorrentesNomeCol]           =colaborador
  contaCorrenteRegistro[contasCorrentesEstadiaCol]        = estadia
  contaCorrenteRegistro[contasCorrentesMetodoCol]         = 'Fechar';
  contaCorrenteRegistro[contasCorrentesMoedaCol]          = moeda
  contaCorrenteRegistro[contasCorrentesCreditDebitCol]    = cOrD
  contaCorrenteRegistro[contasCorrentesItemCol]           = item
  contaCorrenteRegistro[contasCorrentesItemQtdCol]          = 1;
  switch (moeda) {
    case "Real":
      contaCorrenteRegistro[contasCorrentesPrecoUnidadeRealCol]   = valor;
      contaCorrenteRegistro[contasCorrentesPrecoUnidadeOuroCol]   = 0
      contaCorrenteRegistro[contasCorrentesTotalRealCol]      = valor;
      contaCorrenteRegistro[contasCorrentesTotalOuroCol]      = 0
      break;
    case "Ouro": 
      contaCorrenteRegistro[contasCorrentesPrecoUnidadeRealCol]   = 0
      contaCorrenteRegistro[contasCorrentesPrecoUnidadeOuroCol]   = valor;
      contaCorrenteRegistro[contasCorrentesTotalRealCol]      = 0
      contaCorrenteRegistro[contasCorrentesTotalOuroCol]      = valor;
      break;
  }
  contaCorrenteRegistro[contasCorrentesComentariosCol]    = fecharComentario;
  return contaCorrenteRegistro
}

function limparFormularioFechar() {
  FecharSaldoOuroRange.setValue("");
  FecharSaldoRealRange.setValue("");
  FecharFuturoOuroRange.setValue("");
  FecharFuturoRealRange.setValue("");

  FecharDadosRange.setValue("");

  FecharComentarioRange.setValue("");
  GetSaldo();
}


/**
 * Remover colaborador da guia Estadia
 * 
 * @param {string} nome - Nome to colaborador
 * @returns none
 */
function removerColaborador(nome) {
    const sheetName    = "Dados";
    let googleSheet    = CararaLibrary.obterEstadiasPlanilha()
    let sheet          = googleSheet.getSheetByName(sheetName)
    let startRow       = 2; // Assuming data starts from row 2 (after header)
    let startColumn    = 1; // Assuming data starts from column 1 (A)
    // let googleSheetID  = "1cBWZwZ8JPJARGNFmjFAFzKIaPApeO5kN8jencYUVki4";
    let googleSheetID  = CararaLibrary.obterEstadiasID();
    let gamaVals       = CararaLibrary.getRange(googleSheetID, sheetName, startRow, startColumn).getValues();
    const nomes        = gamaVals.map((estadia) => estadia[ESTADIAS_NOME]);
    let row            = nomes.indexOf(nome);
    if (typeof row     === "undefined") { return; }
    row++  // account for the header
    row++  // indexOf is zero based, R1C1 is 1 based
                      
    let firstRow    = row;
    let firstColumn = 1
    let lastRow     = row;
    let lastColumn  = sheet.getLastColumn()

    var r1c1        = "R" + firstRow + "C" + firstColumn + ":" + "R" + lastRow + "C" + lastColumn;
    sheet.getRange(r1c1).deleteCells(SpreadsheetApp.Dimension.ROWS); 
}