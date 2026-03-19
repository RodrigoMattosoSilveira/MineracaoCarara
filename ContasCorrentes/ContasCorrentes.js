// @ts-nocheck
const test = tl.myFunction(4)
const activeSpreadsheet = SpreadsheetApp.getActive();
const contasCorrentesId = CararaLibrary.GetSpreadsheetId(activeSpreadsheet, "CONTAS_CORRENTES");
const contasCorrentesSheet = SpreadsheetApp.openById(contasCorrentesId);
const contasCorrentesSSName = "ContasCorrentes"
const contasCorentesRange                 = "Dados";
const contasCorrentesNome                 = "ContasCorrentesNome";
const contasCorrentesEstadia              = "ContasCorrentesEstadia";
const contasCorrentesRendasDepesas        = "TransacoesRendasDepesas";  
const contasCorrentesCreditoReal          = "CreditoReal";
const contasCorrentesCreditoOuro          = "CreditoOuro";
const contasCorrentesDebitoReal           = "DebitoReal"; 
const contasCorrentesDebitoOuro           = "DebitoOuro";
const contasCorrentesDataCol              = 0;
const contasCorrentesNomeCol              = 1;
const contasCorrentesEstadiaCol           = 2;
const contasCorrentesMetodoCol            = 3;  // Diaria, Salario, Porcentagem, Cantina, PIX, Diversos
const contasCorrentesMoedaCol             = 4   // Real, Ouro
const contasCorrentesCreditDebitCol       = 5;  // Credito, Debito
const contasCorrentesItemCol              = 6;
const contasCorrentesPrecoUnidadeRealCol  = 7;  // Real
const contasCorrentesPrecoUnidadeOuroCol  = 8;  // Gramas de ouro 
const contasCorrentesItemQtdCol           = 9;
const contasCorrentesTotalRealCol         = 10; // Real
const contasCorrentesTotalOuroCol         = 11; // Gramas de ouro
const contasCorrentesComentariosCol       = 12;

const contasCorentesSemaphorRange         = contasCorrentesSheet.getRangeByName("ContasCorrentesSemaforo")


// *********************************************************************************
// obtenhaDadoEstadiaAtiva
// Obtenha o dado com o nome em nomeColaborador, e a coluna em dadoColuna. Note que
// essa funcao so fornece dados paracolaboradores com estadias ativas
// 
// Input
//    nomeColaborador
//    dadoColumna
// Output
//  O dado na linha com o nome docolaborador, e a coluna do dadoColuna; campo em
//  branco no caso the nao have estadia ativa para nomeColaborador
//
//  Note que os valores para access a planilha Estadia encontram-se no arquivo 
//  Estadia.gs
// * ********************************************************************************
// 
function obtenhaDadoEstadiaAtiva(nomeColaborador, dadoColumna) {
  var dadoProcurado = "";
  var achou = false
  estadiaDadosVals.forEach(function (estadiaDadosRegistro) {
    if (!achou && 
        estadiaDadosRegistro[estadiaDadosRangeNomeCol] != "Nome" && 
        estadiaDadosRegistro[estadiaDadosRangeNomeCol] != "" &&
        estadiaDadosRegistro[estadiaDadosRangeFechadaCol] == "")  {
      if (nomeColaborador == estadiaDadosRegistro[estadiaDadosRangeNomeCol]) {
        achou = true;
        dadoProcurado = estadiaDadosRegistro[dadoColumna];
      }
    }
  })
  return dadoProcurado;
}

// *********************************************************************************
// calculeDiariaGanhar
// 
// Input
//    nomeColaborador
//    inicioEstadia
//    metodo
//    tarefa
// Output
//  A diaria a ser ganha pelocolaborador entre hoje e o final de sua estadia
//
// * ********************************************************************************
// 
function calculeDiariaGanhar (nomeColaborador,  inicioEstadia, metodo, tarefa) {
  var diariaGanhar = 0;
  var diaria = obtenhaRemuneracao (metodo, tarefa)
  let fimEstadia = new Date(inicioEstadia);
  fimEstadia.setDate(fimEstadia.getDate() + 90);
  var timeDifference = Math.abs(fimEstadia.getTime() - Date.now());
  var diasRestantes = Math.ceil(timeDifference / (1000 * 3600 * 24)); 

  var diariaGanhar = diasRestantes * diaria;
  return diariaGanhar;
}

// *********************************************************************************
// calculeSalarioGanhar
// 
// Input
//    nomeColaborador
//    inicioEstadia
//    metodo
//    tarefa
// Output
//  O salario a ser ganho pelocolaborador entre hoje e o final de sua estadia,
//  calculado baseado no ganhos diarios
//
// * ********************************************************************************
// 
function calculeSalarioGanhar(nomeColaborador,  inicioEstadia, metodo, tarefa){
  var salarioGanhar = 0;
  var mesesRestantes = 0;
  var salario = obtenhaRemuneracao (metodo, tarefa)
  let fimEstadia = new Date(inicioEstadia);
  fimEstadia.setDate(fimEstadia.getDate() + 90);
  var timeDifference = Math.abs(fimEstadia.getTime() - Date.now());
  var diasRestantes = Math.ceil(timeDifference / (1000 * 3600 * 24));

  var salarioGanhar = diasRestantes * salario / 30;
  return salarioGanhar;
}

Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

// *********************************************************************************
// obtenhaRendasPorcentagem
// 
// Input
//    A gama contendo as rendas auferidas atraves do credito em ouro 
// Output
//    O valor dessa rendar
// * ********************************************************************************
// 
function obtenhaRendasPorcentagem() {
  return obtenhaValorGama("RendasPorcentagem");
}

// *********************************************************************************
// obtenhaRendasDiaria
// 
// Input
//   O nome da gama contendo as rendas auferidas atraves das rendas diarias 
// Output
//    O valor dessa rendaas
// * ********************************************************************************
// 
function obtenhaRendasDiaria() {
  return obtenhaValorGama("RendasDiaria");
}

// *********************************************************************************
// obtenhaRendasSalario
// 
// Input
//    O nome da gama contendo as rendas auferidas atraves das rendas salario 
// Output
//    O valor dessa rendaas
// * ********************************************************************************
// 
function obtenhaRendasSalario() {
  return obtenhaValorGama("RendasSalario");
}

// *********************************************************************************
// obtenhaDespesasPix
// 
// Input
//   O nome da gama contendo as despesas PIX
// Output
//    O valor dessa rendaas
// * ********************************************************************************
// 
function obtenhaDespesasPix() {
  return obtenhaValorGama("DespesasPIX");
}

// *********************************************************************************
// obtenhaDespesasDiversos
// 
// Input
//   O nome da gama contendo as despesas diversas
// Output
//    O valor dessa rendaas
// * ********************************************************************************
// 
function obtenhaDespesasDiversos() {
  return obtenhaValorGama("DespesasDiversos");
}

// *********************************************************************************
// obtenhaDespesaCantina
// 
// Input
//    O nome da gama contendo as despesas na cantina 
// Output
//    O valor dessa rendaas
// * ********************************************************************************
// 
function obtenhaDespesaCantina() {
  return obtenhaValorGama("DespesasCantina");
}

// *********************************************************************************
// obtenhaValorGama
// 
// Input
//    A gama contendo o valor procurado 
// Output
//    O valor procurado
// * ********************************************************************************
// 
function obtenhaValorGama(nomeGama) {
  var valorProcurado = "";
    const contaCorrenteIDSS = SpreadsheetApp.openById(contasCorrentesId);
    const valorProcuradoVals = contaCorrenteIDSS.getRangeByName(nomeGama).getValues();
    valorProcurado = valorProcuradoVals[0][0];
  return valorProcurado;
}


// *********************************************************************************
// armazeneValorGama
// 
// Input
//    nomeGama (Range) O nome da gama aonde armazenar o valor
//    valor (float) O valor a ser armazenado
// Output
//    Nenhum
// * ********************************************************************************
// 
function armazeneValorGama(nomeGama, valor) {
  var values = [[valor]];
  const contaCorrenteIDSS = SpreadsheetApp.openById(contasCorrentesId);
  contaCorrenteIDSS.getRangeByName(nomeGama).setValues(values);
}
/* ********************************************************************************************************************* */
// ccSetEstadiaFormatCondition
// Set the Estadia's conditional rules
//   Input:   
//    targetSheet (string) - The target sheet
//    range (range) - the target range
//    col (Integer) - the column
// Output:
//    TRUE if set up, null otherwise
//
// @see https://yagisanatode.com/copy_and_paste_values_from_one_google_sheet_to_another_with_apps_script/
// @see https://spreadsheet.dev/iterate-through-rows-in-google-sheets-using-apps-script
// @see https://developers.google.com/apps-script/reference/spreadsheet/range
//* ********************************************************************************************************************* */
// 
function ccSetEstadiaFormatCondition (targetSheet, estadiaRange) {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getSheetByName(targetSheet);
  if (sheet) {
    spreadsheet.setActiveSheet(sheet);
  } else {
    return null
  }
  
  const rules = sheet.getConditionalFormatRules(); 
  var values = estadiaRange.getValues();
  var today = new Date();
  
  let todayExpired = new Date();
  todayExpired.setDate(todayExpired.getDate() - 90);
  let todayWeek = new Date();
  todayWeek.setDate(todayWeek.getDate() - 83);
  let todayMonth = new Date();
  todayMonth.setDate(todayMonth.getDate() - 60);

  var topLeftRow = estadiaRange.getRow();
  var topLeftColumn = estadiaRange.getColumn();
    var r1c1 = "R" + topLeftRow + "C" + topLeftColumn + ":" + "R" + topLeftRow + "C" + topLeftColumn;
    const range = sheet.getRange(r1c1);
    var rule = SpreadsheetApp.newConditionalFormatRule()
    .whenDateBefore(todayExpired)
    .setBackground('#FF0000')
    .setRanges([range])
    .build();
    rules.push(rule)
    rule = SpreadsheetApp.newConditionalFormatRule()
    .whenDateBefore(todayWeek)
    .setBackground('#ffff00')
    .setRanges([range])
    .build();
    rules.push(rule)
    rule = SpreadsheetApp.newConditionalFormatRule()
    .whenDateBefore(todayMonth)
    .setBackground('#00ff00')
    .setRanges([range])
    .build();
    rules.push(rule)
    sheet.setConditionalFormatRules(rules); // Apply the updated rules
}
