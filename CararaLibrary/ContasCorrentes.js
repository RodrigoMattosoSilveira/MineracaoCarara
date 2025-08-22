// Script Files: https://script.google.com/home/projects/1MUcp-N2BXCoJI3ussufDnfghByRVGBATXMPP7BeZg-1iCQXbrKw5rzaO/edit
// Scipt Id: 1MUcp-N2BXCoJI3ussufDnfghByRVGBATXMPP7BeZg-1iCQXbrKw5rzaO

// Contas Correntes - CC_SHEET_ID
// 
const CC_SHEET_ID								= "10QXCS1QspqKH8owJQiazFc1dSumWy94mgHIVhZargcA";
const CC_TAB_NAME			    				= "ContasCorrentes"
const contasCorentesRange						= "Dados";
const contasCorrentesNome          				= "ContasCorrentesNome";
const contasCorrentesEstadia        			= "ContasCorrentesEstadia";
const CC_TRANSACOES_RENDAS_DESPESAS_RANGE_NAME	= "TransacoesRendasDepesas";  
const contasCorrentesCreditoReal         	= "CreditoReal";
const contasCorrentesCreditoOuro          	= "CreditoOuro";
const contasCorrentesDebitoReal           	= "DebitoReal"; 
const contasCorrentesDebitoOuro           	= "DebitoOuro";
const contasCorrentesDataCol              	= 0;
const contasCorrentesNomeCol             	= 1;
const contasCorrentesEstadiaCol           	= 2;
const contasCorrentesMetodoCol            	= 3;  // Diaria, Salario, Porcentagem, Cantina, PIX, Diversos
const contasCorrentesMoedaCol             	= 4   // Real, Ouro
const contasCorrentesCreditDebitCol       	= 5;  // Credito, Debito
const contasCorrentesItemCol              	= 6;
const contasCorrentesPrecoUnidadeRealCol  	= 7;  // Real
const contasCorrentesPrecoUnidadeOuroCol  	= 8;  // Gramas de ouro 
const contasCorrentesItemQtdCol          	 = 9;
const contasCorrentesTotalRealCol         	= 10; // Real
const contasCorrentesTotalOuroCol         	= 11; // Gramas de ouro
const contasCorrentesComentariosCol       	= 12;

function cc_getSpreadSheet() {
  return SpreadsheetApp.openById(CC_SHEET_ID);
}
function cc_getContasCorrentesTab() {
	let spreadSheet = cc_getSpreadSheet();
	return spreadSheet.getSheetByName(CC_TAB_NAME);
}
function cc_getDadosSheet() {
	let spreadSheet = cc_getSpreadSheet();
	return spreadSheet.getSheetByName(DADOS_TAB_NAME);
}
function cc_getDadosSheetRange() {
	let spreadSheet = cc_getSpreadSheet();
	return spreadSheet.getRangeByName(CC_TRANSACOES_RENDAS_DESPESAS_RANGE_NAME);
}
function cc_getTransacoesRendasDespesasRange() {
	let spreadSheet = cc_getSpreadSheet();
	return spreadSheet.getRangeByName(CC_TRANSACOES_RENDAS_DESPESAS_RANGE_NAME);
}

/* ********************************************************************************************************************* */
// resumirContaCorrentAssociado
//    Calcula um resumo dos Creditos e Debitos de um Associado, in Real e Ouro
// 
// Input:
//    nome (String)       - O nome to Associado
//    estadia (Date       - (Date) - A data da estadia do Associado
//    transacoes (Range)  - A fonte dos dados a serem sumarizados
//
// Output:
//    creditosAndDebitosRealOuro (Object) - Um object com os sumarios desejados, ou null in caso de erro:
//    var creditosAndDebitosRealOuro = {
//      Credito: {
//        Real: 0,
//         Ouro: 0
//      },
//      Debito: {
//        Real: 0,
//        Ouro: 0
//      },
//    }
//* ********************************************************************************************************************* */
//
function resumirContaCorrenteAssociado (nome, estadia, transactions) {
  // Iniializamos os sumarios 
    var creditosDebitosRealOuro = {
    Credito: {
      Real: 0,
      Ouro: 0
    },
    Debito: {
      Real: 0,
      Ouro: 0
    },
  }

  // Campos de trabalho para compararmos a estadia desejada com a estadia dos 
  var estadiaDia = new Date(estadia).getDay();
  var estadiaMes = new Date(estadia).getMonth();
  var estadiaAno = new Date(estadia).getFullYear();

  if (transactions.length == 0) {
    var message = "";
    message += "Nao ha nehuma trasacao a ser processada";
    return null;
  }
  var filteredTransactions = transactions.filter(function(transaction) {
    return transaction[contasCorrentesNomeCol] == nome &&
      transaction[contasCorrentesDataCol] != "" &&
      transaction[contasCorrentesMetodoCol] != "Fechar" &&
      new Date(transaction[contasCorrentesEstadiaCol]).getDay() == estadiaDia &&
      new Date(transaction[contasCorrentesEstadiaCol]).getMonth() == estadiaMes &&
      new Date(transaction[contasCorrentesEstadiaCol]).getFullYear() == estadiaAno;
  });
  if (filteredTransactions.length == 0) {
    return creditosDebitosRealOuro;
  }

  for (var i=0; i < filteredTransactions.length; i++) {
    var creditoDebito = filteredTransactions[i][contasCorrentesCreditDebitCol]
    switch (creditoDebito) {
      case "Credito":
            var moeda = filteredTransactions[i][contasCorrentesMoedaCol];
            switch (moeda) {
          case "Real":
            creditosDebitosRealOuro["Credito"]["Real"] += filteredTransactions[i][contasCorrentesTotalRealCol];
            break;
          case "Ouro":
            creditosDebitosRealOuro["Credito"]["Ouro"] += filteredTransactions[i][contasCorrentesTotalOuroCol];
            break;
          default:
            var message = "";
            message += "Valor do atributo Moeda invalido (";
            message += filteredTransactions[i][moedaCol];
            message += ") na linha #"
            message += i;
            message += " na matrix de transacoes";
            return null;
        }
        break;
      case "Debito":
            var moeda = filteredTransactions[i][contasCorrentesMoedaCol];
        switch (moeda) {
          case "Real":
            creditosDebitosRealOuro["Debito"]["Real"] += filteredTransactions[i][contasCorrentesTotalRealCol];
            break;
         case "Ouro":
            creditosDebitosRealOuro["Debito"]["Ouro"] += filteredTransactions[i][contasCorrentesTotalOuroCol];
            break;
          default:
            var message = "";
            message += "Valor do atributo Moeda invalido (";
            message += filteredTransactions[i][contasCorrentesMoedaCol];
            message += ") na linha #"
            message += i;
            message += " na matrix de transacoes";
            return null;
        }
        break;
     default:
        var message = "";
        message += "Valor do atributo Credito/Debito invalido (";
        message += filteredTransactions[i][contasCorrentesCreditDebitCol];
        message += ") na linha #"
        message += i;
        message += " na matrix de transacoes"
        console.error(message)
        return null;
    }
  }
  return creditosDebitosRealOuro;
}
