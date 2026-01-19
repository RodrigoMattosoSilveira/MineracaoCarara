/**
 * Removes duplicate rows from the current sheet.
 */
function removeDuplicates() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const data = sheet.getDataRange().getValues();
  const uniqueData = {};
  for (let row of data) {
    const key = row.join();
    uniqueData[key] = uniqueData[key] || row;
  }
  sheet.clearContents();
  const newData = Object.values(uniqueData);
  sheet.getRange(1, 1, newData.length, newData[0].length).setValues(newData);
}

/* ********************************************************************************************************************* */
// activateSheet
//    Activates a sheet in the current spreadsheet
// 
// Input:
//    sheetName (String) - The sheet name to activate
// 
// Output:
//    sheet (Sheet) - The activated sheet, or null if not found
//
//* ********************************************************************************************************************* */
// 
function activateSheet(sheetName) {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getSheetByName(sheetName);
  if (sheet) {
    spreadsheet.setActiveSheet(sheet);
  } else {
    return null;
  }
  return sheet;
}

/* ********************************************************************************************************************* */
// removeHeaderAndBlankRiows
//    Remove header and blank rows from the named range. For each row, it examines row[0] ang filters it out if it is
//    equal to "" or the name argument
// 
// Input:
//    rangeName (String) - The range name where to apply the filter
//    headerString - (String) - The undesired header string on the named column
//    column (Int) - The column where to apply the filter
//
// Output:
//    range (Range) - The filtered range, null if no range found
//* ********************************************************************************************************************* */
// 
function removeHeaderAndBlankRows(rangeName, header, column) {
  // const spreadSheet = SpreadsheetApp.getActiveSpreadsheet();
  // const sheet = spreadSheet.getSheetByName(sheetName);
  // const range = sheet.getRange("A1:D100");
  // const filter = range.createFilter();
  // Get the Range
  const spreadSheet = SpreadsheetApp.getActiveSpreadsheet();
  var range = spreadSheet.getRangeByName(rangeName);
  if (!range) {
    return null;
  }

  var filter;
  // Create a filter in the Range
  if (range.getFilter()) {
    filter = range.getFilter();
    filter.remove();
  }
  filter = range.createFilter();
 
  // Set criteria, no hader string nor blanks
  const criteria = SpreadsheetApp.newFilterCriteria().whenTextDoesNotContain(header).build();

  // Apply the criteria to the filter
  filter.setColumnFilterCriteria(column, criteria);

  // Retrive the filtered data
  range = filter.getRange();
  var filteredData = range.getValues();

  // Remove the filter 
  // filter.remove();

  return filteredData;
}
// ****************************************************************************
// Converter um dado lido de uma planilha na célula em uma cadeia the caracters
// 
// @parm {string} data - Uma cadeia the caracters representando uma data
// @return {Date|null} - A data convertida; false otherwise
// ****************************************************************************
//
function dateToString(data) {
	let dataObj = new Date(data);
	let dataStr = '';

	// Month
	if ((dataObj.getMonth() + 1) < 10) {
		dataStr += "0";
	}
	dataStr += dataObj.getMonth() + 1;
	dataStr += '/';
	// Day
	if (dataObj.getDate() < 10) {
		dataStr += "0";
	}
	dataStr += dataObj.getDate();
	dataStr += '/';
	// Year
	dataStr += dataObj.getFullYear();

	return dataStr;
}

// ****************************************************************************
// Converter um numero para a letra maiuscula equivalente
// 
// @parm {number} num - A numero a ser convertido
// @return {string|null} - a letra
// ****************************************************************************
//
function numeroParaLetra (num) { return (num < 1 || num > 26) ? null : String.fromCharCode(num + 64); }


if (typeof module !== 'undefined') module.exports = {
    dateToString,
    numeroParaLetra,
}

/* ********************************************************************************************************************* */
// CalcularSaldoContasCorrentes
//    Calcula o saldo de um Colaborador em uma determinada estadia
// 
// Input:
//    nome (String)       - O nome to Colaborador
//    estadia (string)    - A data da estadia do Colaborador
//
// Output:
//    saldo (Object) - Um object com os saldos desejados, ou null in caso de erro:
//    var saldo = {
//        Real: 0,
//        Ouro: 0
//    }
// ********************************************************************************************************************* */
// 
function calcularSaldoContasCorrentes(nome, estadia) {

  rendas = {...calcularRendas(nome, estadia)};
  return {
    auferidas: {  
      Real: rendas.auferidas.Real.credito - rendas.auferidas.Real.debito, 
      Ouro: rendas.auferidas.Ouro.credito - rendas.auferidas.Ouro.debito
    },
    futuras: {...rendas.futuras},
  }
}

/**
 *  Calcula as rendas auferidas e futuras de um colaborador em uma determinada estadia
 * @param {string} nome - Nome do colaborador
 * @param {string} estadia - Data da estadia do colaborador
 * @returns {object} - um object com os saldos auferidos e futuros
 * {
 *    auferidas: {
 *      Real: { credito: 0, debito: 0 },  
 *      Ouro: { credito: 0, debito: 0 }
 *    },
 *    futuras: { Real: 0, Ouro: 0 }
 * }
 */
function calcularRendas(nome, estadia) {
  let rendas = {
    auferidas: {
      Real: { credito: 0, debito: 0 },
      Ouro: { credito: 0, debito: 0 }
    },
    futuras: { Real: 0, Ouro: 0 }
  };

  let auferidas = {...calcularRendasAuferidas(nome, estadia)};
  let futuras = {...calcularRendasFuturas(nome, estadia)};
  return {
    auferidas: {...auferidas},
    futuras: {...futuras}
  };
}

function calcularRendasAuferidas(nome, estadia) {
  //  Inicialize os valores de retorno  
  let auferidas = {
    Real: { credito: 0, debito: 0 },
    Ouro: { credito: 0, debito: 0 }
  };

  let contasCorrentesDadosRange = cc_getTransacoesRendasDespesasRange();
  let transactions              = contasCorrentesDadosRange.getValues()
  var filteredTransactions      = transactions.filter(function(transaction) {
    let estadiaDateStr = dateToString(transaction[contasCorrentesEstadiaCol]);
    return transaction[contasCorrentesNomeCol] == nome && estadiaDateStr == estadia;
  });

  for (var i=0; i < filteredTransactions.length; i++) {
    var creditoDebito = filteredTransactions[i][contasCorrentesCreditDebitCol]
    switch (creditoDebito) {
      case "Credito":
        var moeda = filteredTransactions[i][contasCorrentesMoedaCol];
        switch (moeda) {
          case "Real":
            auferidas["Real"]["credito"] += filteredTransactions[i][contasCorrentesTotalRealCol];
            break;
          case "Ouro":
            auferidas["Ouro"]["credito"] += filteredTransactions[i][contasCorrentesTotalOuroCol];
            break;
          default:
            return null;
        }
        break;
      case "Debito":
        var moeda = filteredTransactions[i][contasCorrentesMoedaCol];
        switch (moeda) {
          case "Real":
            auferidas["Real"]["debito"] += filteredTransactions[i][contasCorrentesTotalRealCol];
            break;
         case "Ouro":
            auferidas["Ouro"]["debito"] += filteredTransactions[i][contasCorrentesTotalOuroCol];
            break;
          default:
            return null;
        }
        break;
     default:
        return null;
    }
  }
  return auferidas;
}

function calcularRendasFuturas(nome, estadia) {
  let metodo      = obterEstadiaGamaRegistroNome(nome)[ESTADIAS_METODO];
  let saldoGanhar = 0.00;
  let futuras = { Real: 0.00, Ouro: 0.00 };
  switch (metodo) {
    case "Diária":
      saldoGanhar = calcularRendasFuturasDiaria(nome, estadia)
      futuras["Real"]= saldoGanhar;
      break;
    case "Salário":
      saldoGanhar = calcularRendasFuturasSalario(nome, estadia);
      futuras["Real"]= saldoGanhar;
      break;
    case "Porcentagem":
      saldoGanhar = calcularRendasFuturasOuro(nome, estadia);
      futuras["Ouro"]= saldoGanhar;
      break;
    default:
      break;
  }

  return futuras;
}

function calcularRendasFuturasDiaria(nome, inicioEstadia) {
  let diariaGanhar = 0;
  let estadiaRegistro = obterEstadiaGamaRegistroNome(nome);
  let diaria = estadiaRegistro[ESTADIAS_REMUNERACAO];
  let fimEstadia = new Date(inicioEstadia);
  fimEstadia.setDate(fimEstadia.getDate() + 90);
  let timeDifference = Math.abs(fimEstadia.getTime() - Date.now());
  let diasRestantes = Math.ceil(timeDifference / (1000 * 3600 * 24)); 

  diariaGanhar = diasRestantes * diaria;
  return diariaGanhar;
}
function calcularRendasFuturasSalario(nome, inicioEstadia) {
  let salarioGanhar = 0;
  let estadiaRegistro = obterEstadiaGamaRegistroNome(nome);
  let salario = estadiaRegistro[ESTADIAS_REMUNERACAO];
  let fimEstadia = new Date(inicioEstadia);
  fimEstadia.setDate(fimEstadia.getDate() + 90);
  let timeDifference = Math.abs(fimEstadia.getTime() - Date.now());
  let diasRestantes = Math.ceil(timeDifference / (1000 * 3600 * 24));

  salarioGanhar = diasRestantes * salario / 30;
  return salarioGanhar;
}
function calcularRendasFuturasOuro(nome, inicioEstadia) {
  var gramasEstimadasGanhar = 0;
  var diasRestantes = 0;

  //  Calcule o número de dias restantes nessa estadia
  let fimEstadia = new Date(inicioEstadia);
  fimEstadia.setDate(fimEstadia.getDate() + 90);
  var timeDifference = Math.abs(fimEstadia.getTime() - Date.now());
  var diasRestantes = Math.ceil(timeDifference / (1000 * 3600 * 24));

  // Obtenha a porcentagem da producao alocada ao associadp
  let estadiaRegistro = obterEstadiaGamaRegistroNome(nome);
  let poco = estadiaRegistro[ESTADIAS_LOCAL];
  var porcentagem = estadiaRegistro[ESTADIAS_REMUNERACAO];

  // Obtenha a media de producao de Ouro do poço nos ultimos 10 dias
  let mediaDeProducao = obterProducaoPocoRecenteMedia(poco, 10);

  //  Calcule of valor estimado a ser ganho, no valor do Ouro
  var gramasEstimadasGanhar = mediaDeProducao * diasRestantes * porcentagem;

  return gramasEstimadasGanhar;
}

/**
 * Retorna um novo objeto Date representando hoje menos o número de dias 
 * informado.
 * @param {number} dias - Número de dias a subtrair (deve ser um número inteiro 
 * não negativo)
 * @returns {Date} - A data resultante
 */
function getDateMinusDays(dias) {
    // Input validation
    if (typeof dias !== 'number' || !Number.isInteger(dias) || dias < 0) {
        throw new Error("dias must be a non-negative integer.");
    }

    const today = new Date(); // Current date and time
    const result = new Date(today); // Clone to avoid mutating original
    result.setDate(result.getDate() - dias); // Subtract days
    return result;
}