const producaoId = "1XJQmUb-1W2egXWj000Uer8QS6FZd7lUgqppoehjxwj4";
const producaoRange = "Dados!A:I";
const producaoDataCol = 0;
const producaoMinaCol  = 1;
const producaoPreQueimadaCol  = 2; 
const producaoPosQueimadaCol  = 3; 
const producaoPosEmpresaGramasCol  = 4; 
const producaoPosEmpresaBrCol  = 5; 
const producaoPosAssociadosGramasCol  = 6; 
const producaoPosAssociadosBrCol  = 7; 
const producaoPosAssociadosMediaCol  = 8; // Changed to be the average of the gold produced by MC (producaoPosQueimadaCol)
// *********************************************************************************
// obtenhaProducaoOuro
// 
// Input
//    dataProcurada (Date)
// Output
//  registroProducao (Array) Os dados de producao na data procurada
//
// * ********************************************************************************
// 
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
      if (producaoDataDay == dataProcuradaDay &&  
            producaoDataMonth == dataProcuradaMonth && 
            producaoDataYear == dataProcuradaYear) {
        achou = true;
        registroProducao = producaoRegistro
      }
    }
  })  
  Logger.log("Producao de ouro\n" + registroProducao);
  return registroProducao
}
