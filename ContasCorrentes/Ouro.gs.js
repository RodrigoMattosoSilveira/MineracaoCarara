const ouroId = "12wHhbSYMDf9soQEQoXq5ba8-TcH_ZWUMYgEqEpD0PFY";
const ouroDadosGama = "Dados!A:K";
const ouroDataCol = 0;
const ouro24KaratOncaCol = 1;
const ouro22KaratOncaCol = 2; 
const ouro18KaratOncaCol = 3; 
const ouro14KaratOncaCol = 4;
const ouro10KaratOncaCol = 5;
const ouro24KaratGramaCol = 6;
const ouro22KaratGramaCol = 7; 
const ouro18KaratGramaCol = 8; 
const ouro14KaratGramaCol = 9;
const ouro10KaratGramaCol = 10;

function obtenhaCotacaoOuro(dataProcurada) {
  const ouroIDSS = SpreadsheetApp.openById(ouroId);
  const ouroDadosRng = ouroIDSS.getRange(ouroDadosGama);
  const ouroDadosVals = ouroDadosRng.getValues();
  var registroOuro = [];
  var achou = false;

  const dataProcuradaDay = dataProcurada.getDate();
  const dataProcuradaMonth = dataProcurada.getMonth() + 1;  
  const dataProcuradaYear = dataProcurada.getFullYear();
  var ouroData;
  ouroDadosVals.forEach (function (ouroDadosRegistro) {
    ouroData = new Date(ouroDadosRegistro[ouroDataCol]);
    if (ouroData != "" && ouroData != "Data") {
      var ouroDataDay = ouroData.getDate();
      var ouroDataMonth = ouroData.getMonth() + 1;  
      var ouroDataYear = ouroData.getFullYear()   
      if (ouroDataDay == dataProcuradaDay &&  ouroDataMonth == dataProcuradaMonth && ouroDataYear == dataProcuradaYear) {
        achou = true;
        registroOuro = ouroDadosRegistro
      }
    }
  })  
  Logger.log("Quotqcao de ouro\n" + registroOuro);
  return registroOuro
}

