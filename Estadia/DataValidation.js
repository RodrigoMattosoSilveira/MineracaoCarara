function buildConfigObjects () {
	const fileName = "DataValidationHtml.html";
	const configurationObj = ReadDataValidationFile(fileName)
	
	// Environment
	let environment = {
		activeSpreadsheet: SpreadsheetApp.getActiveSpreadsheet(),
		oSpreadsheetName: "",
		oSpreadsheetId: "",
		oSheetName: "",
		spreadsheetName: "Estadia",
		spreadsheetId: "",
		lSheetName: "",
		dSheetName: "",
		validationName: ""
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