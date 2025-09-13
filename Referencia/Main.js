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
  obterReferenciaGoogleSheet().getRangeByName(REFERENCIA_OURO_USD_ONCA_GAMA_NOME).setValues(rangeValue);
}

// TODO Mineração Carará will have to get its own API key
function updateDolarParaReal() {
  var url = 'https://api.currencyfreaks.com/v2.0/rates/latest?apikey=50d10488069441ee9bcb078a6239e5c7'
  var response = UrlFetchApp.fetch(url);
  var content = response.getContentText();
  var json = JSON.parse(content);
  var brlRate = json['rates']['BRL']
  const masterSS = SpreadsheetApp.openById(REFERENCIA_GOOGLE_SHEET_ID);
  masterSS.getRangeByName("UsdToBrl").setValue(brlRate);
}

