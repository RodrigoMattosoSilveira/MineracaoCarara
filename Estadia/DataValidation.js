function buildConfigObjects () {
	const fileName = "DataValidationHtml.html";
	const config = ReadDataValidationFile(fileName)
	
	// Process each data validation
	const dataValidation =  config.dataValidation
	const sheetNames = Object.keys(dataValidation);
	sheetNames.forEach(sheetName => {
		// Find all data validations for this sheet

		const dataValidations = Object.keys(dataValidation[sheetName])
		dataValidations.forEach( dataValidation => {
			const dConfig = buildLocalAcceptableEntriesConfig(dataValidation)
		})
	});
}
function buildOriginalAcceptableEntries(config) {
	let originalAcceptableEntries = {}
	const acceptableEntriesKeys = Object.keys(acceptableEntries)
	acceptableEntriesKeys.forEach(acceptableEntry => {

	})
}
function buildLocalAcceptableEntriesConfig(dataValidation) {
	let spreadsheet = SpreadsheetApp.openById(ESTADIA_SPREADSHEET_ID)
	let sheet = spreadsheet.getSheetByName(ESTADIA_TRABALHO_TESTE_SHEET_NAME);
	let acceptableEntriesConfig = {
		spreadsheetId: ESTADIA_SPREADSHEET_ID,
		sheet: sheet,
		// 1-based
		// all validations ranges start on row #2
		startRow: 2,
		// 1-based
		// we host the local reference data in the same sheet, diffrent columns
		columnNumber: ESTADIAS_TRABALHO_METODO_COL+1
	}
	return acceptableEntriesConfig;

}
function ReadDataValidationFile (fileName) {
  const jsonString = HtmlService.createHtmlOutputFromFile(fileName).getContent();
  const jsonObject = JSON.parse(jsonString);
  return jsonObject
}