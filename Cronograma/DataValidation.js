function ConfigureSpreadsheetDataValidationsPlanejar () {
	const fileName = "DataValidationPlanejarHtml.html";
	const configurationObj = ReadDataValidationFile(fileName)
	
	// Environment
	let environment = {
		activeSpreadsheet: SpreadsheetApp.getActiveSpreadsheet(),
		spreadsheetName: "Cronograma"
	}
	CararaLibrary.ConfigureDataValidations(configurationObj, environment)
}
function ConfigureSpreadsheetDataValidationsInformar () {
	const fileName = "DataValidationInformatHtml.html";
	const configurationObj = ReadDataValidationFile(fileName)
	
	// Environment
	let environment = {
		activeSpreadsheet: SpreadsheetApp.getActiveSpreadsheet(),
		spreadsheetName: "Cronograma"
	}
	CararaLibrary.ConfigureDataValidations(configurationObj, environment)
}
/**
 * Reads an HTML file containing the JSON string defining validation configurations
 * @param {string} fileName 
 * @returns 
 */
function ReadDataValidationFile (fileName) {
  const jsonString = HtmlService.createHtmlOutputFromFile(fileName).getContent();
  const jsonObject = JSON.parse(jsonString);
  return jsonObject
}