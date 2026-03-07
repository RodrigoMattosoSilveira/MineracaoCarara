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
  let dRange = buildLocalRangeDestinationTest();
  let oRange = buildOriginalRangeValidationTest();
  let lRange = buildLocalRangeValidationTest();
  ConfigureDataValidationColumn(dRange, oRange, lRange)
}
const configureRangeValidationTest = () => {
  let localRangeDestination = buildLocalRangeDestinationTest();
  let localRangeValidation   = buildLocalRangeValidationTest();
  let targetSheet    = localRangeDestination.sheet;
  let column         = localRangeDestination.columnNumber;
  let localRangeName = localRangeValidation.rangeName;
  configureRangeValidation(targetSheet, column, localRangeName);
}
const  clearDataRangeValidationsTest = () => {
  // populate the destination object
  let localRangeDestination = buildLocalRangeDestinationTest()
  clearDataRangeValidations (localRangeDestination)
} 
const clearRangeColumnTest = () => {
  // populate the local, Estatia, object
  let localRangeValidation = buildLocalRangeValidationTest();

  clearRangeColumn(localRangeValidation)
}
const copyOriginalToLocalRangeTest = () => {
  // Populate the original, Referencia, object
  let originalRangeValidation = buildOriginalRangeValidationTest();

  // populate the local, Estatia, object
  let localRangeValidation = buildLocalRangeValidationTest();
  
  // copy
  copyOriginalToLocalRange(originalRangeValidation, localRangeValidation)
  // update the range
  const spreadSheet = SpreadsheetApp.openById(ESTADIA_SPREADSHEET_ID)
  sheet             = spreadSheet.getSheetByName(ESTADIA_DADOS_TESTE_SHEET_NAME);
  const sheetName   = ESTADIA_DADOS_TESTE_SHEET_NAME;
  const colI        = numeroParaLetra(ESTADIAS_DADOS_METODO_COL+1) // 1-based
  const linI        = 2
  const colF        = numeroParaLetra(ESTADIAS_DADOS_METODO_COL+1) // 1-based
  const linF        = getLastRowInColumn(sheet, numeroParaLetra(ESTADIAS_DADOS_METODO_COL+1)) 
  const rangeA1     = obterA1C1(sheetName, colI, linI,  colF, linF)
  const rangeName   = localRangeValidation.rangeName
  updateRange(spreadSheet, sheet, rangeA1, rangeName)
}
const updateRangeTest = () => {
  const spreadSheet = SpreadsheetApp.openById(ESTADIA_SPREADSHEET_ID)
  const sheetName   = ESTADIA_TRABALHO_TESTE_SHEET_NAME;
  const sheet       = spreadSheet.getSheetByName(sheetName);
  const colI        = numeroParaLetra(ESTADIAS_DADOS_METODO_COL)
  const linI        = 2
  const colF        = numeroParaLetra(ESTADIAS_DADOS_METODO_COL)
  const linF        = getLastRowInColumn(sheet, numeroParaLetra(ESTADIAS_DADOS_METODO_COL+1)) 
  const rangeA1     = obterA1C1(sheetName, colI, linI,  colF, linF)
  const rangeName   = "MetodoTeste"
  updateRange(spreadSheet, sheet, rangeA1, rangeName)
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

// oRange
const buildOriginalRangeValidationTest = () => {
  let spreadsheet_ = SpreadsheetApp.openById(REFEENCIA_SPREADSHEET_ID)
  let sheet = spreadsheet_.getSheetByName(REFERENCIA_METODO_TESTE_SHEET_NAME);
  let oRange = {
    spreadsheetId: REFEENCIA_SPREADSHEET_ID,
    spreadsheet: spreadsheet_,
    sheet: sheet,
    // 1-based
    // all original reference data is hostedin column 1
    columnNumber: 1, 
    // 1-based
    startRow: 1, 
    rangeName: REFERENCIA_METODOS_VALIDOS_TESTE_RANGE_NAME
  };
  return oRange;
}

// lRange
const buildLocalRangeValidationTest = () => {
  let spreadsheet = SpreadsheetApp.openById(ESTADIA_SPREADSHEET_ID)
  let sheet = spreadsheet.getSheetByName(ESTADIA_TRABALHO_TESTE_SHEET_NAME);
  let lRange = {
    spreadsheetId: ESTADIA_SPREADSHEET_ID,
    sheet: sheet,
    // 1-based
    // all validations ranges start on row #2
    startRow: 2,
    // 1-based
    // we host the local reference data in the same sheet, diffrent columns
    columnNumber: ESTADIAS_TRABALHO_METODO_COL+1, 
    rangeName: ESTADIAS_METODOS_VALIDOS_TESTE_RANGE_NAME
  }
  return lRange;
}

// dRange
const buildLocalRangeDestinationTest = () => {
  let spreadsheet = SpreadsheetApp.openById(ESTADIA_SPREADSHEET_ID)
  let sheet = spreadsheet.getSheetByName(ESTADIA_DADOS_TESTE_SHEET_NAME);
  let dRange = {
    spreadsheetId: ESTADIA_SPREADSHEET_ID,
    sheet: sheet,
    // 1-based
    // all validations ranges start on row #2
    startRow: 2, 
    // 1-based
    columnNumber: ESTADIAS_DADOS_METODO_COL+1, // same for Dev, Test, Prod
    rangeName: ESTADIAS_METODOS_VALIDOS_TESTE_RANGE_NAME
  }
  return dRange;
}