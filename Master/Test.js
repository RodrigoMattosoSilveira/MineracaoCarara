function updateGoldPriceInSheetTest() {
	const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Dados');
  if (!sheet) {
	Logger.log('Sheet "GoldPrice" not found.');
	return;
  }
  
  const goldPrice =updateGoldPriceInSheet();
  if (goldPrice) {
	Logger.log(`Updated gold price: ${goldPrice}`);
  } else {
	Logger.log('Failed to retrieve gold price.');
  }			
}

function updateDolarParaRealTest() {
	const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Dados');
  if (!sheet) {
	Logger.log('Sheet "GoldPrice" not found.');
	return;
  }
  
  updateDolarParaReal();
  const dolarToReal = sheet.getRange('UsdToBrl').getValue();
  Logger.log(`Updated Dolar to Real: ${dolarToReal}`);
}
