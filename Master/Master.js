const MASTER_ID = "1CXo2aNn6bXqbMZTypgG6I9DTdVEy-8wly5AhOs0k8Zg";
const obterMasterSheet = () =>  SpreadsheetApp.openById(MASTER_ID);

const PERIODOS_GAMA    = "Periodos";
const PERIODO_NOME_COL = 0;
const PERIODO_ID_COL   = 1;
const PERIODO_HORA_COL = 2;
const obterPeriodosGama     = () => obterMasterSheet().getRangeByName(PERIODOS_GAMA).sort(PERIODO_ID_COL+1);;
const obterPeriodosGamaVals = () => obterPeriodosGama().getValues();

// This function will be in charge to return the current gold price
//  https://1337invest.com/how-to-import-gold-price-into-google-sheet/
function getOneOzGoldPriceUsd() {
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
  
  
  return goldPrice;
}
function updateGoldPriceInSheet(){

  const goldValue = getOneOzGoldPriceUsd()
  const rangeValue = [[goldValue]]
  const masterSS = SpreadsheetApp.openById(MASTER_ID);
  masterSS.getRangeByName("GoldUsdOz").setValues(rangeValue);
}

function updateDolarParaReal() {
  const goldValue = GOOGLEFINANCE("CURRENCY:USDBRL")
  const rangeValue = [[goldValue]]
  const masterSS = SpreadsheetApp.openById(MASTER_ID);
  masterSS.getRangeByName("GoldUsdOz").setValues(rangeValue);
}
// ****************************************************************************
// obterPeriodos - Retorna um objecto, classificados pelos periodos, como os 
// nomes de cada periodo como chave
// 
// Input
// 		none 
// Output
// 		periodos (Object), os períodos de trabalho da organização
// ****************************************************************************
// 
function obterPeriodos () {
  let periodos = {};
  obterPeriodosGamaVals().forEach(element => {
    periodos[element[PERIODO_NOME_COL]] = {
      'ID': element[PERIODO_ID_COL], 
      'Hora': element[PERIODO_HORA_COL],
  }});
  return periodos;
}
// ****************************************************************************
// obterPeriodosIds - Retorna uma matriz de objetos que consiste dos IDs 
// dos períodos de trabalho da organização
// 
// Input
// 		none 
// Output
// 		matriz (Array), os períodos de trabalho da organização
// ****************************************************************************
// 
const obterPeriodosIds = () => {
  let matriz = []
  obterPeriodosGamaVals().forEach(element => {matriz.push(element[PERIODO_ID_COL])});
  return matriz;
}
// ****************************************************************************
// obterPeriodosNomes - Retorna uma matriz de objetos que consiste dos nomes 
// dos períodos de trabalho da organização
// 
// Input
// 		none 
// Output
// 		matriz (Array), os períodos de trabalho da organização
// ****************************************************************************
// 
const obterPeriodosNomes = () => {
  let matriz = []
  // obterPeriodosGamaVals().forEach(element => {matriz.push(element[PERIODO_NOME_COL])});
  // let sheet = obterMasterSheet();
  // let range =  obterMasterSheet().obterPeriodosGama().obterPeriodosGamaVals()
  // let vals = range.getValues();
  obterPeriodosGamaVals().forEach(element => {matriz.push(element[PERIODO_NOME_COL])})
  return matriz;
}