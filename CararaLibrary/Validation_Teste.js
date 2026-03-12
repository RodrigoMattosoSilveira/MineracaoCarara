const ESTADIA_SPREADSHEET_ID             = "1cBWZwZ8JPJARGNFmjFAFzKIaPApeO5kN8jencYUVki4";
const ESTADIA_PLANILHA                   = "Estadia";
const ESTADIA_DADOS_SHEET_NAME           = "Dados";
const ESTADIAS_DADOS_METODO_COL          = 4; // 0-based, ajust to 1-based as needed
const ESTADIA_DADOS_TESTE_SHEET_NAME     = "DadosTeste";
const ESTADIA_TRABALHO_TESTE_SHEET_NAME  = "TrabalhoTeste";
const ESTADIAS_TRABALHO_METODO_COL       = 2; // 0-based, ajust to 1-based as needed
const REFEENCIA_SPREADSHEET_ID           = "1LJqg-R3ZNB-fC44QKKxjx8ubhHYzbPWEDCmPykHn-y8";
const REFERENCIA_PLANILHA                = "REFERENCIA";
const REFERENCIA_METODO_TESTE_SHEET_NAME = "MetodoTeste";
const ESTADIAS_METODOS_VALIDOS_TESTE_RANGE_NAME    = "MetodosValidosTeste";
const REFERENCIA_METODOS_VALIDOS_TESTE_RANGE_NAME  = "MetodosValidosTeste";

const ConfigureDataValidationColumnTest = () => {
	let dConfig = buildDataValidationConfigTest();
	let oConfig = buildOriginalAcceptableEntriesConfigTest();
	let lConfig = buildLocalAcceptableEntriesConfigTest();
	ConfigureDataValidationColumn(dConfig, oConfig, lConfig)
}
const configureDataValidationTest = () => {
	let dConfig                    = buildDataValidationConfigTest();
	let lConfig                    = buildLocalAcceptableEntriesConfigTest();
	let targetSheet                = dConfig.sheet;
	let column                     = dConfig.columnNumber;
	let localAccetableEntriesRange = getAcceptableEntriesRange(lConfig)
	configureDataValidation(targetSheet, column, localAccetableEntriesRange);
}
const  clearDestinationDataValidationsTest = () => {
  // populate the destination configuration object
  let dConfig = buildDataValidationConfigTest()
  clearDestinationDataValidations (dConfig)
} 
const clearRangeColumnTest = () => {
  // populate the local, Estatia, configuration object
  let lConfig = buildLocalAcceptableEntriesConfigTest();

  clearRangeColumn(lConfig)
}
const copyOriginalToLocalAcceptableEntriesTest = () => {
	// Populate the original, Referencia, config object
	let oConfig = buildOriginalAcceptableEntriesConfigTest();

	// populate the local, Estatia, config object
	let lConfig = buildLocalAcceptableEntriesConfigTest();

	// copy
	copyOriginalToLocalAcceptableEntries(oConfig, lConfig)
}

const getLastRowInColumnTest = () => {
	const sheet = SpreadsheetApp.openById(ESTADIA_SPREADSHEET_ID).getSheetByName(ESTADIA_DADOS_TESTE_SHEET_NAME);
	const columnLetter = "A";
	let expectedValue = 7;
	let actualValue = getLastRowInColumn(sheet, columnLetter) 
	actualValue === expectedValue ?
		console.info(" ✔︎ actualValue === expectedValue") :
		console.error(" ✖︎  actualValue === expectedValue: " + actualValue + " != " + expectedValue);
}

// Original Acceptable Entries Configuration
const buildOriginalAcceptableEntriesConfigTest = () => {
	let spreadsheet_ = SpreadsheetApp.openById(REFEENCIA_SPREADSHEET_ID)
	let sheet = spreadsheet_.getSheetByName(REFERENCIA_METODO_TESTE_SHEET_NAME);
	let acceptableEntriesConfig = {
		spreadsheetId: REFEENCIA_SPREADSHEET_ID,
		spreadsheet: spreadsheet_,
		sheet: sheet,
		// 1-based
		// all original reference data is hostedin column 1
		columnNumber: 1, 
		// 1-based
		startRow: 1
	};
	return acceptableEntriesConfig;
}

// Local Acceptable Entries Configuration
const buildLocalAcceptableEntriesConfigTest = () => {
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

// Data Validation Configuration
const buildDataValidationConfigTest = () => {
	let spreadsheet = SpreadsheetApp.openById(ESTADIA_SPREADSHEET_ID)
	let sheet = spreadsheet.getSheetByName(ESTADIA_DADOS_TESTE_SHEET_NAME);
	let dataValidationConfig = {
		spreadsheetId: ESTADIA_SPREADSHEET_ID,
		sheet: sheet,
		// 1-based
		// all validations ranges start on row #2
		startRow: 2, 
		// 1-based
		columnNumber: ESTADIAS_DADOS_METODO_COL+1, // same for Dev, Test, Prod
	}
	return dataValidationConfig;
}