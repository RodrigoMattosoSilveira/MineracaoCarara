// This function will be in charge to return the current gold price
//  https://1337invest.com/how-to-import-gold-price-into-google-sheet/
function UpdateGoldPriceInUSD() {
  // The website we will grab gold price from. goldprice.org is my favorite website when it comes to precious metals values.
  var url = "https://data-asg.goldprice.org/dbXRates/USD";
  // UrlFetchApp is a powerfull tool that let your script request a web ressource to grab its content.
  // Our option variable will be in charge to explain to UrlFetchApp how to do to grab what we need.
  // If you want to learn more about http requests, you will find a great tutorial here: https://learn.onemonth.com/understanding-http-basics/
  var options =
      {
        "method"  : "GET",
        "followRedirects" : true,
        "muteHttpExceptions":true
      };
  var result = UrlFetchApp.fetch(url, options);
  
  // Now we got the content we need, we store it into the data variable
  var data = JSON.parse(result.getContentText());
  
  // Finally, we extract the gold price from the data. The price is for 1oz of gold.
  var goldPrice = data['items'][0]['xauPrice'];
  
  const rangeValue = [[goldPrice]]
  obterReferenciaGoogleSheet().getRangeByName(REFERENCIA_OURO_USD_ONCA_GAMA_NOME).setValues(rangeValue);

}

// ****************************************************************************
// Retorna um mapa, identificados e classificados pelos nomes dos periodos de 
// trabalho na organizacao, cada nomecolaborador com um objeto consistindo da 
// indetidade e hora do periodo de trabalho
// 
// @returns {Object} os períodos de trabalho da organização
// ****************************************************************************
// 
function obterPeriodos() {
  let periodos = new Map();
  obterReferenciaPeriodosGamaVals().forEach(element => { 
    periodos.set(element[REFERENCIA_PERIODO_NOME_COL], {'ID': element[REFERENCIA_PERIODO_ID_COL], 'Hora': element[REFERENCIA_PERIODO_HORA_COL],});
  });
  return periodos;
}
// ****************************************************************************
// obterPeriodosIds - Retorna um de objetos que consiste dos IDs dos períodos 
// de trabalho da organização
// 
// @returns {Array} as IDs dos períodos de trabalho da organização
// ****************************************************************************
// 
const obterPeriodosIds = () => {
  let matriz = []
  obterReferenciaPeriodosGamaVals().forEach(element => {matriz.push(element[PERIODO_ID_COL])});
  return matriz;
}
// ****************************************************************************
// obterPeriodosNomes - Retorna uma matriz de objetos que consiste dos nomes 
// dos períodos de trabalho da organização
// 
// @returns {Array} os nomes dos períodos de trabalho da organização
// ****************************************************************************
// 
const obterPeriodosNomes = () => {
  let matriz = []
  // obterPeriodosGamaVals().forEach(element => {matriz.push(element[PERIODO_NOME_COL])});
  // let sheet = obterMasterSheet();
  // let range =  obterMasterSheet().obterPeriodosGama().obterPeriodosGamaVals()
  // let vals = range.getValues();
  obterReferenciaPeriodosGamaVals().forEach(element => {matriz.push(element[PERIODO_NOME_COL])})
  return matriz;
}
