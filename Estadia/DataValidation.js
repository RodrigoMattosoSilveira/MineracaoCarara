function ConfigureSpreadsheetDataValidations () {
	const fileName = "DataValidationHtml.html";
	const configurationObj = ReadDataValidationFile(fileName)
	
	// Environment
	let environment = {
		activeSpreadsheet: SpreadsheetApp.getActiveSpreadsheet(),
		spreadsheetName: "Estadia"
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