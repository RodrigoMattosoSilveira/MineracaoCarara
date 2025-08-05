function uuid() {
  return Utilities.getUuid();
}

/* ********************************************************************************************************************* */
// Global values
//
//* ********************************************************************************************************************* */
//
// const ui = SpreadsheetApp.getUi();
const estadiaID = "1cBWZwZ8JPJARGNFmjFAFzKIaPApeO5kN8jencYUVki4";
const estadiaRange = "Dados!A:H"
const estadiaRangeNomeCol = 0;
const estadiaRangeComeçoCol = 1;
const estadiaRangeFechadaCol = 2;
const estadiaRangeDisponibilidadeCol = 3;
const estadiaRangeMetodoCol = 4;	
const estadiaRangeAreaCol = 5;	
const estadiaRangeLocalCol = 6;	
const estadiaRangeTarefaCol = 7;	
const estadiaRangeComentariosCol = 8;

const folhaID = "1T1uTdxSNuxSBuUVVLBoJxiME3HrTtNC3bgb69PThduY";
const turnoHojeDiaRange = "TurnoHojeDia!A6:H1001"
const turnoHojeDiaRangeFirstRow = 6;
const turnoHojeDiaRangeFirstCell= 1;
const turnoHojeNomeCol = 0;
const turnoHojeDisponibilidadeCol = 1;
const turnoHojeMetodoCol = 2;
const turnoHojeAreaCol = 3;
const turnoHojeLocalCol = 4;
const turnoHojeTarefaCol = 5;
const turnoHojeComentariosCol = 6;
;
const turnoOntemDiaRange = "TurnoOntemDia!A2:F1001"
const turnoOntemDiaRangeFirstRow = 2;
const turnoOntemDiaRangeFirstCell= 1;
const turnoOntemNomeCol = 0;
const turnoOntemDisponibilidadeCol = 1;
const turnoOntemMetodoCol = 2;
const turnoOntemAreaCol = 3;
const turnoOntemLocalCol = 4;
const turnoOntemTarefaCol = 5;
const turnoOntemComentariosCol = 6

const remuneracaoId = "1vg3ba2eV6pJh_yfwGP-AQ0BjIY9A8Uf4UdupU_3sRIk";
const remuneracaoRange = "Dados!A:D";
const remuneracaoMetodoCol = 0;
const remuneracaoTarefaCol = 1;
const remuneracaoValorCol = 2; 
const remuneracaoComentárioCol = 3; 

const ouroId = "12wHhbSYMDf9soQEQoXq5ba8-TcH_ZWUMYgEqEpD0PFY";
const ouroRange = "Dados!A:K";
const ouroDataCol = 0;
const ouro24KaratCol = 1;
const ouro22KaratCol = 2; 
const ouro18KaratCol = 3; 
const ouro14KaratCol = 4;
const ouro10KaratCol = 5;

const producaoId = "1XJQmUb-1W2egXWj000Uer8QS6FZd7lUgqppoehjxwj4";
const producaoRange = "Dados!A:H";
const producaoDataCol = 0;
const producaoMinaCol  = 1;
const producaoPreQueimadaCol  = 2; 
const producaoPosQueimadaCol  = 3; 
const producaoPosEmpresaGramasCol  = 4; 
const producaoPosEmpresaBrCol  = 5; 
const producaoPosAssociadosGramasCol  = 6; 
const producaoPosAssociadosBrCol  = 7; 

const contasCorrentesId = "10QXCS1QspqKH8owJQiazFc1dSumWy94mgHIVhZargcA";
const contasCorrentesRange = "Dados!A:H";
const contasCorrenteDataCol = 0;
const contasCorrenteNomeCol = 1;
const contasCorrenteItemCol = 2; 
const contasCorrenteMetodoCol = 3; 
const contasCorrenteValorCreditoCol = 4;
const contasCorrentePesoCreditoCol = 5;
const contasCorrenteValorDebitoCol = 6;
const contasCorrentePesoDebitoCol = 7;
const contasCorrenteComentariosCol = 8;

/* ********************************************************************************************************************* */
// prepareTurnoDiario
// Trabalhe com três gamas: 
//    turnoHojeDia - Veja a tabela Folha!TurnoHojeDia
//    turnoOntemDia - Veja a tabela Folha!TurnoOntemDia
//    Estadia - Veja a tabela Estadia!Dados
// Para cada registro da gama turnoOntemDia, monte um novo registro as ser inserido na gama turnoHojeDia: 
//    Encontre o registro de contraparte da gama Estadia
//    Se Estadia[Fechada] for nulo 
//        pôr turnoHojeDia[Disponibilidade] =  Estatia[Disponibilidade] 
//        pôr turnoHojeDia[Método/Área/Local/Tarefa] = turnoOntemDia[Método/Área/Local/Tarefa] 
// Para cada registro da gama Estadia 
//    Se não estiver na gama turnoOntemDia :
//        pôr turnoHojeDia[Disponibilidade] Estatia[Disponibilidade] 
//        pôr turnoHojeDia[Método/Área/Local/Tarefa] = Estatia[Método/Área/Local/Tarefa]
// 
// Input:   
//    turnoOntemDia - Uma gama derivada da tabela Ontem, na planilha Folha
//    Estadia - Uma gama derivada da tabela Dados, na planilha Estadia
// Output:
//    turnoHojeDia - A tabela Folha!turnoHojeDia pronta com o plano de trabalho pronto para ser executado
//
// @see https://yagisanatode.com/copy_and_paste_values_from_one_google_sheet_to_another_with_apps_script/
// @see https://spreadsheet.dev/iterate-through-rows-in-google-sheets-using-apps-script
// @see https://developers.google.com/apps-script/reference/spreadsheet/range
//* ********************************************************************************************************************* */
// 
function prepareTurnoDiario() {

  const folhaIDSS = SpreadsheetApp.openById(folhaID);
  const estadiaDiaSS = SpreadsheetApp.openById(estadiaID);

  const turnoOntemDiaRng = folhaIDSS.getRange(turnoOntemDiaRange)
  const turnoOntemDiaVals = turnoOntemDiaRng.getValues();

  const estadiaRng = estadiaDiaSS.getRange(estadiaRange)
  const estadiaVals = estadiaRng.getValues();

  const turnoHojeDiaRng = folhaIDSS.getRange(turnoHojeDiaRange);
  const turnoHojeDiaVals = turnoHojeDiaRng.getValues();
  
  var turnoHojeDiaGama = [];
  var turnoHojeDiaRegistro = [];

  // Logger.log("turnoOntemDia registros")
  turnoOntemDiaVals.forEach(function (ontemRegistro) {
    turnoHojeDiaRegistro = [];
    if (ontemRegistro[turnoOntemNomeCol] != "") {
      // Logger.log(ontemRegistro[turnoOntemNomeCol]);
      var ontemRegistroNome = ontemRegistro[turnoOntemNomeCol]
      var achou = false;
      estadiaVals.forEach(function (estadiaRegistro) {
        if (!achou && estadiaRegistro[turnoOntemNomeCol] != "Nome" && 
          estadiaRegistro[estadiaRangeNomeCol] == ontemRegistroNome && 
          estadiaRegistro[estadiaRangeFechadaCol] == "") {
            
          turnoHojeDiaRegistro[turnoHojeNomeCol]             = ontemRegistroNome;
          turnoHojeDiaRegistro[turnoHojeDisponibilidadeCol]  = estadiaRegistro[estadiaRangeDisponibilidadeCol];
          turnoHojeDiaRegistro[turnoHojeMetodoCol]           = ontemRegistro[turnoOntemMetodoCol];
          turnoHojeDiaRegistro[turnoHojeAreaCol]             = ontemRegistro[turnoOntemAreaCol];
          turnoHojeDiaRegistro[turnoHojeLocalCol]            = ontemRegistro[turnoOntemLocalCol];
          turnoHojeDiaRegistro[turnoHojeTarefaCol]          = ontemRegistro[turnoHojeTarefaCol];

          achou = true;
          turnoHojeDiaGama.push(turnoHojeDiaRegistro)
        }
      })
    }
  });
  
  estadiaVals.forEach(function (estadiaRegistro) {
    if (estadiaRegistro[estadiaRangeNomeCol] != "" && 
        estadiaRegistro[estadiaRangeNomeCol] != "Nome" && 
        estadiaRegistro[estadiaRangeFechadaCol] == "") {
      turnoHojeDiaRegistro = [];

      achou = false;
      turnoOntemDiaVals.forEach(function (ontemRegistro) {
        if (!achou && ontemRegistro[turnoOntemNomeCol] == estadiaRegistro[estadiaRangeNomeCol]) {
          achou = true;
        }
      });
      if (!achou) {
          turnoHojeDiaRegistro[turnoHojeNomeCol]            = estadiaRegistro[estadiaRangeNomeCol];
          turnoHojeDiaRegistro[turnoHojeDisponibilidadeCol] = estadiaRegistro[estadiaRangeDisponibilidadeCol];
          turnoHojeDiaRegistro[turnoHojeMetodoCol]          = estadiaRegistro[estadiaRangeMetodoCol];
          turnoHojeDiaRegistro[turnoHojeAreaCol]            = estadiaRegistro[estadiaRangeAreaCol];
          turnoHojeDiaRegistro[turnoHojeLocalCol]           = estadiaRegistro[estadiaRangeLocalCol];
          turnoHojeDiaRegistro[turnoHojeTarefaCol]          = estadiaRegistro[estadiaRangeTarefaCol];
          turnoHojeDiaGama.push(turnoHojeDiaRegistro);
      }
    }
  });

  turnoHojeDiaGama = removeAtributosDuplicados("TurnoHojeDia", turnoHojeDiaGama)

  turnoHojeDiaRng.clear();
  var sheet = SpreadsheetApp.getActiveSheet();
  sheet.getRange(6, 1, turnoHojeDiaGama.length, turnoHojeDiaGama[0].length).setValues(turnoHojeDiaGama);
}

//* ********************************************************************************************************************* */
// removeAtributosDuplicados
// Essa é uma lógica simples para inspecionar o primeiro atributo de uma coleção de registros e garantir que não haja dois 
// registros com o mesmo primeiro atributo
// 
// Input:   
//    tabela - O nome da tabela
//    gamaCandidata - A gama a ser inspecionada
// Output:
//    gamaCoerente - A.gamaCandidata, com seus registros duplicados removidos
// 
//* ********************************************************************************************************************* */
// 
function removeAtributosDuplicados(tabela, gamaCandidata) {
  var gamaCoerente = [];
  var gamaCoerenteKeys = [];
  gamaCandidata.forEach (function (registroCandidato) {
    var chaveCandidata = registroCandidato[0];
    if (typeof gamaCoerenteKeys.find((element) => element == chaveCandidata) === "undefined") {
        gamaCoerenteKeys.push(chaveCandidata);
        gamaCoerente.push(registroCandidato)
    } else {
        var message = ""
        message += "Chave Duplicada: " + chaveCandidata
        message += "\n"
        message += "\Na Tabela:       " + tabela
        ui.alert(message);
        // Logger.log("Chave Duplicada (" + chaveCandidata + ") na tabela " + tabela);
        // console.log("Chave Duplicada (" + chaveCandidata + ") na tabela " + tabela);
    }
  })
  return gamaCoerente;
}
//* ********************************************************************************************************************* */
// prepareTurnoNoturno
// Trabalhar niss
//* ********************************************************************************************************************* */
// 
function prepareTurnoNoturno() {
}

/* ********************************************************************************************************************* */
// executeTurnoDiario
//  - Simples atualização da tabela Folha!turnoOntemDia com o conteúdo da tabela Folha!TurnoOntemDia
//  - Atualização complexa da tabela ContasCorrentes!Dadoscom, baseada nos registros oriundos das tabelas
//    Folha!TurnoOntemDia, Remuneração!Dados, e Ouro!Dados:
//      - Data: oruiundo de Folha!TurnoHojeDia:Data
//      - Nome: oruiundo de Folha!TurnoHojeDia:Nome
//      - Local: oruiundo de Folha!TurnoHojeDia:Local
//      - Item: oruiundo de Folha!TurnoHojeDia:Tarefa/Metodo
//      - R/D: Is "R"
//      - Valor: para diaristas e assalariados, derivado de Remuneracao!Dados, baseado em Folha!TurnoHojeDia:Tarefa/Metodo
//      - Peso: para porcentagentaristas, derivado de Ouro!Dados, baseado em Folha!TurnoHojeDia:Tarefa/Metodo
//      - Comentários: oruiundo de Folha!TurnoHojeDia:Comentario
// 
// Input:
//    data
//  Auxialiry
//    Tabela Folha!TurnoHojeDia
//    Tabela Remuneracao!TurnoOntemDia
//    Tabela Ouro!Dados
// 
// Output:
//    A tabela Folha!TurnoOntemDia, atualizada com o conteudo da tabela Folha!TurnoOntemDia
//    A tabela ContasCorrentes!Dados atualizada com registros oriundos da tabela Folha!TurnoOntemDia
//
//* ********************************************************************************************************************* */
// 
function executeTurnoDiario() {
  const folhaIDSS = SpreadsheetApp.openById(folhaID);

  const turnoOntemDiaRng = folhaIDSS.getRange(turnoOntemDiaRange)
  const turnoOntemDiaVals = turnoOntemDiaRng.getValues();

  const turnoHojeDiaRng = folhaIDSS.getRange(turnoHojeDiaRange);
  const turnoHojeDiaVals = turnoHojeDiaRng.getValues();

  const turnHojeDiaData = folhaIDSS.getRangeByName("TurnoHojeDiaData").getValues();

  const contaCorrentesIDSS = SpreadsheetApp.openById(contasCorrentesId);

  // Copie os dados da Folha!TurnoHojeDia para a Folha!TurnoOntemDia
  turnoOntemDiaRng.clear(); 
  var sheet = SpreadsheetApp.getActiveSheet();
  turnoHojeDiaRng.copyTo(turnoOntemDiaRng,  SpreadsheetApp.CopyPasteType.PASTE_VALUES, false)

  // Build the remuneracaoObj to aid in calculations
  var remuneracaoObj = buildRemuneracaoObj()

  // Get the Gold Production for the day 
  var goldProduction = obtenhaProducaoOuro(new Date(turnHojeDiaData[0]))

  // Process the assignments
  var valor = 0;
  var peso = 0;
  var contaCorrenteRegistro = [];
  var contasCorrentesRangeDados = [];
  turnoHojeDiaVals.forEach(function (turnoHojeDiaRegistro) {
    const nome = turnoHojeDiaRegistro[turnoHojeNomeCol];
    const disponibilidade   = turnoHojeDiaRegistro[turnoHojeDisponibilidadeCol];
    const metodo            = turnoHojeDiaRegistro[turnoHojeMetodoCol];
    const area              = turnoHojeDiaRegistro[turnoHojeAreaCol];
    const local             = turnoHojeDiaRegistro[turnoHojeLocalCol];
    const tarefa            = turnoHojeDiaRegistro[turnoHojeTarefaCol];
    const comentarios       = turnoHojeDiaRegistro[turnoHojeComentariosCol];
    var ignoreRegister = false;
    if (metodo != "") {
      contaCorrenteRegistro = [];
      contaCorrenteRegistro.push(new Date(turnHojeDiaData[0]));
      contaCorrenteRegistro.push(nome);
      contaCorrenteRegistro.push(area + "/" + local + "/" + tarefa);
      contaCorrenteRegistro.push(metodo);
      contaCorrenteRegistro.push(0);    // valor credito
      contaCorrenteRegistro.push(0);    // peso credito
      contaCorrenteRegistro.push(0);    // valor debito
      contaCorrenteRegistro.push(0);    // peso debito    
      contaCorrenteRegistro.push(comentarios);
      var simpleObj = remuneracaoObj[metodo]
      switch (metodo) {
        case "Diária":
          contaCorrenteRegistro[contasCorrenteValorCreditoCol] = simpleObj[tarefa]
          break;
        case "Salário":
          if (isLastDayOfMonth(new Date(turnHojeDiaData[0]))) {
            contaCorrenteRegistro[contasCorrenteValorCreditoCol] = simpleObj[tarefa]
          }
          break;
        case "Porcentagem":
          contaCorrenteRegistro[contasCorrentePesoCreditoCol] = goldProduction[producaoPosAssociadosGramasCol] * simpleObj[tarefa]
          break;
        case "Meio_A_Meio":
          contaCorrenteRegistro[contasCorrentePesoCreditoCol] = goldProduction[producaoPosAssociadosGramasCol] * simpleObj[tarefa]
          contaCorrenteRegistro[contasCorrenteMetodoCol] = "Porcentagem";
          break;
        default:
          var message = ""
          message += "Metodo de pagamento invalido: " + metodo
          Logger.log(message);
          ignoreRegister = true;
          break;
      }
      if (!ignoreRegister) {
        contasCorrentesRangeDados.push(contaCorrenteRegistro) 
      }
    }
  })
  Logger.log("Contas Correntes");
  contasCorrentesRangeDados.forEach(function (registro) {
    Logger.log(registro)
  })

  // Append
  var contaCorrentesDados = contaCorrentesIDSS.getSheetByName("Dados");
  var lastRow = contaCorrentesDados.getLastRow();
  contaCorrentesDados.getRange(lastRow + 1, 1, contasCorrentesRangeDados.length, contasCorrentesRangeDados[0].length).setValues(contasCorrentesRangeDados)
}

function buildRemuneracaoObj(date) {
  const remuneracaoIDSS = SpreadsheetApp.openById(remuneracaoId);
  const remuneracaoRng = remuneracaoIDSS.getRange(remuneracaoRange)
  const remuneracaoVals = remuneracaoRng.getValues();
  var metodo = "";
  var tarefa = "";
  var valor = "";
  var remuneracaoObj = {};
  remuneracaoVals.forEach (function (remuneracaoRegistro) {
    metodo = remuneracaoRegistro[remuneracaoMetodoCol]
    tarefa = remuneracaoRegistro[remuneracaoTarefaCol]
    valor = remuneracaoRegistro[remuneracaoValorCol]
    if (metodo != "" && metodo != "Metodo") {
      if (!(metodo in remuneracaoObj)) {
        remuneracaoObj[metodo] = {};
        var simplesObj = {};
        simplesObj[tarefa] = valor
        remuneracaoObj[metodo] = {};
        remuneracaoObj[metodo] = simplesObj
      }
      else {
        if (!(tarefa in remuneracaoObj[metodo]))   {
          // var simplesObj = {};
          // simplesObj[tarefa] = valor
          remuneracaoObj[metodo][tarefa]= valor
        } else {
          var message = ""
          message += "Remuneracao: " + method + "." + tarefa + " duplicados";
        } 
      }  
    }
  }) 
  
  Logger.log(remuneracaoObj);
  return remuneracaoObj;
}

function obtenhaQuotacaoOuroTest() {
  const folhaID = "1T1uTdxSNuxSBuUVVLBoJxiME3HrTtNC3bgb69PThduY";
  const folhaIDSS = SpreadsheetApp.openById(folhaID);
  const turnHojeDiaData = folhaIDSS.getRangeByName("TurnoHojeDiaData").getValues();
  obtenhaProducaoOuro(new Date(turnHojeDiaData[0])) 
  // obtenhaProducaoOuro(new Date("2025-07-31T00:00:00"));
}
function obtenhaQuotacaoOuro(dataProcurada) {
  const ouroIDSS = SpreadsheetApp.openById(ouroId);
  const ouroRng = ouroIDSS.getRange(ouroRange)
  const ouroVals = ouroRng.getValues();
  var registroOuro = [];
  var achou = false;

  const dataProcuradaDay = dataProcurada.getDate();
  const dataProcuradaMonth = dataProcurada.getMonth() + 1;  
  const dataProcuradaYear = dataProcurada.getFullYear();
  var ouroData;
  ouroVals.forEach (function (ouroRegistro) {
    ouroData = new Date(ouroRegistro[ouroDataCol]);
    if (ouroData != "" && ouroData != "Data") {
      var ouroDataDay = ouroData.getDate();
      var ouroDataMonth = ouroData.getMonth() + 1;  
      var ouroDataYear = ouroData.getFullYear()   
      if (ouroDataDay == dataProcuradaDay &&  ouroDataMonth == dataProcuradaMonth && ouroDataYear == dataProcuradaYear) {
        achou = true;
        registroOuro = ouroRegistro
      }
    }
  })  
  Logger.log("Cotação de ouro\n" + registroOuro);
  return registroOuro
}

function obtenhaProducaoOuroTest() {
  const folhaID = "1T1uTdxSNuxSBuUVVLBoJxiME3HrTtNC3bgb69PThduY";
  const folhaIDSS = SpreadsheetApp.openById(folhaID);
  const turnHojeDiaData = folhaIDSS.getRangeByName("TurnoHojeDiaData").getValues();
  obtenhaProducaoOuro(new Date(turnHojeDiaData[0])) 
}
function obtenhaProducaoOuro(dataProcurada) {
  const producaoIDSS = SpreadsheetApp.openById(producaoId);
  const producaoRng = producaoIDSS.getRange(producaoRange)
  const producaoVals = producaoRng.getValues();
  var registroProducao = [];
  var achou = false;

  const dataProcuradaDay = dataProcurada.getDate();
  const dataProcuradaMonth = dataProcurada.getMonth() + 1;  
  const dataProcuradaYear = dataProcurada.getFullYear();
  var producaoData;
  producaoVals.forEach (function (producaoRegistro) {
    producaoData = new Date(producaoRegistro[producaoDataCol]);
    if (producaoData != "" && producaoData != "Data") {
      var producaoDataDay = producaoData.getDate();
      var producaoDataMonth = producaoData.getMonth() + 1;  
      var producaoDataYear = producaoData.getFullYear()   
      if (producaoDataDay == dataProcuradaDay &&  producaoDataMonth == dataProcuradaMonth && producaoDataYear == dataProcuradaYear) {
        achou = true;
        registroProducao = producaoRegistro
      }
    }
  })  
  Logger.log("Producao de ouro\n" + registroProducao);
  return registroProducao
}

function isLastDayOfMonth(transactionDate) {
  var itIs = false;
  const thisDay = transactionDate.getDate();
  const thisMonth = transactionDate.getMonth() + 1;  
  const thisYear = transactionDate.getFullYear();
  const lastDayOfThisMonth = new Date(thisYear, thisMonth + 1, 0).getDate();
  if (lastDayOfThisMonth == thisDay) {
    itIs = true;
  }
  return itIs
}
function removeAtributosDuplicadosTest() {
  Logger.log("Testando removeAtributosDuplicados");
  var gamaCandidata = []
  gamaCandidata.push(["a", 2, 3, 4, 5, 6]);
  gamaCandidata.push(["b", 2, 3, 4, 5, 6]);
  gamaCandidata.push(["a", 2, 3, 4, 5, 6]);
  
  gamaCandidata.push(["d", 2, 3, 4, 5, 6]);

  Logger.log(" gamaCandidata antes");
  Logger.log(gamaCandidata);
  gamaCandidata = removeAtributosDuplicados("TurnoHojeDia", gamaCandidata)
  Logger.log(" gamaCandidata depois");
  Logger.log(gamaCandidata);

}

