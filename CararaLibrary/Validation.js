/** 
 * The function to configure validation
 * @param {Object} dConfig The data Validation Configuration
 * @param {Object} oConfig The original Acceptable Entries Configuration
 * @param {Object} lConfig The local Acceptable Entries Configuration
 */
function ConfigureDataValidationColumn (dConfig, oConfig, lConfig) {
	// Clear the current data validations
	clearDestinationDataValidations (dConfig)

	// Clear the local Acceptable Entries
	clearRangeColumn(lConfig)

	// Copy the original validation to the local validation Acceptable Entries
	copyOriginalToLocalAcceptableEntries(oConfig, lConfig);

	// Configure the validations
	let targetSheet    = dConfig.sheet;
	let column         = dConfig.columnNumber;
	let localAccetableEntriesRange = getAcceptableEntriesRange(lConfig)
	configureDataValidation(targetSheet, column, localAccetableEntriesRange);
}

/** 
 * Removes data validation for the column where we will configure the new data
 * validation
 * @param {Object} dConfig The data Validation Configuration
 * @returns {Range} the range we cleared validations
 */
function clearDestinationDataValidations (dConfig) {
  const columnLeft  = numeroParaLetra(dConfig.columnNumber);
  const firstRow    = dConfig.startRow
  const columnRight = columnLeft;
  const lastRow     = dConfig.sheet.getLastRow(); // ok to clear empty cells
  const sheetName   = dConfig.sheet.getName();
  const a1C1Gama    = obterA1C1(sheetName, columnLeft, firstRow, columnRight, lastRow)
  const range       = dConfig.sheet.getRange(a1C1Gama);
  range.clear({validationsOnly: true});
  return range
}   

/** 
 * Clears the local acceptable entries range
 * @param {Object} lConfig The local acceptable entries configuration
 */ 
function  clearRangeColumn(lConfig) {
  let sheet = lConfig.sheet;
  let numRows = sheet.getLastRow() - lConfig.startRow + 1; // The number of row to clear
  let range = sheet.getRange(lConfig.startRow, lConfig.columnNumber, numRows);
  range.clear();
}

/** 
 * Copies the original data validation to the new data validation range
 * @param {Object} oConfig The original acceptable entries configuration
 * @param {Object} lConfig The local acceptable entries configuration
 */
function copyOriginalToLocalAcceptableEntries(oConfig, lConfig) {
  let oSpreadsheet           = oConfig.spreadsheet;
  let range					 = getAcceptableEntriesRange(oConfig);
  let rangeVals              = range.getValues();
  let targetSheet            = lConfig.sheet;
  let targetRangeFirstLine   = lConfig.startRow;
  let targetRangeFirstColumn = lConfig.columnNumber;
  copiarGama (rangeVals, targetSheet, targetRangeFirstLine, targetRangeFirstColumn)
}

/** 
 * Builds an A1 description of the local acceptable values range
 * @param {Object} config The acceptable entries configuration (original or local)
 * @returns {string} The acceptable entries range
 */
function getAcceptableEntriesRange(config) {
	let sheetName    = config.sheet.getName();
	let columnLetter =  numeroParaLetra(config.columnNumber);
	let firstRow     = config.startRow;
	let lastRow      =  getLastRowInColumn(config.sheet, columnLetter);
	let a1C1Gama     = obterA1C1(sheetName, columnLetter, firstRow, columnLetter, lastRow);
	let range        = config.sheet.getRange(a1C1Gama)
	return range;
}

/**
 * Gets the last non-empty row number in a specific column:
 * @param {sheet} sheet with the column we seek the last row of;
 * @param {string} columnLetter - The column letter (e.g., "A");
 * @returns {number} The last row number with data in that column;
 */
function getLastRowInColumn(sheet, columnLetter) {
  try {
    const columnRange = sheet.getRange(columnLetter + ":" + columnLetter);
    const values = columnRange.getValues();

    // Traverse from bottom up to find the last non-empty cell
    for (let row = values.length - 1; row >= 0; row--) {
      if (values[row][0] !== "" && values[row][0] !== null) {
        return row + 1; // Convert zero-based index to 1-based row number
      }
    }
    return 0; // No data found
  } catch (err) {
    Logger.log("Error: " + err);
    return 0;
  }
}
/** 
 * Configures data validation
 * @param {Sheet} sheet - The sheet with the column to be validated
 * @param {Number} columnNumber - The number of the column to be validaded, 1-based
 * @param {String} localAcceptableEntriesRange - A gama com os valores aceitaveir
 * @returns {none} The system configures the validation
 */
function configureDataValidation(sheet, columnNumber, localAcceptableEntriesRange) {
  let columnLetter = numeroParaLetra(columnNumber);
  let lastRow      = sheet.getLastRow();
  let sheetName    = sheet.getName();
  let a1C1Gama     = obterA1C1(sheetName, columnLetter, 2, columnLetter, lastRow)

  let range        = sheet.getRange(a1C1Gama); // Specify the range for validation

  let rule         = SpreadsheetApp.newDataValidation()
  .requireValueInRange(localAcceptableEntriesRange, true) // Reference range for valid values
  .setAllowInvalid(false) // Prevent invalid entries
  .build();

  range.setDataValidation(rule); // Apply the validation rule
}
