/** 
 * The function to configure validation
 * @param {Object} dRange The range with data to be validated
 * @param {Object} oRange The original validation range
 * @param {Object} lRange The local validation range
 */
function ConfigureDataValidationColumn (dRange, oRange, lRange) {
  // Clear the validations on the range with data to be validated
  clearDataRangeValidations (dRange)

  // Clear the local range
  clearRangeColumn(lRange)

  // Copy the original validation to the local validation range
  copyOriginalToLocalRange(oRange, lRange);

  // Update the range to reflect the data
  const spreadSheet = dRange.spreadsheet;
  const sheetName   = dRange.sheet.getName();
  const sheet       = dRange.sheet;
  const colI        = numeroParaLetra(dRange.columnNumber)
  const linI        = 2
  const colF        = numeroParaLetra(dRange.columnNumber)
  const linF        = getLastRowInColumn(sheet, numeroParaLetra(dRange.columnNumber)); 
  const rangeA1     = obterA1C1(sheetName, colI, linI,  colF, linF)
  const rangeName   = dRange.rangeName;
  updateRange(spreadSheet, sheet, rangeA1, rangeName)

  // Configure the validations
  let targetSheet    = dRange.sheet;
  let column         = dRange.columnNumber;
  let localRangeName = lRange.rangeName;
  configureRangeValidation(targetSheet, column, localRangeName);
}

/** 
 * Removes validatons for the column where we will configure the new validations
 * @param {Object} dRange The range with data to be validated
 * @returns {Range} the range we cleared validations
 */
function clearDataRangeValidations (dRange) {
  const columnLeft  = numeroParaLetra(dRange.columnNumber);
  const columnRight = columnLeft;
  const lastRow     = dRange.sheet.getLastRow(); // ok to clear empty cells
  const sheetName   = dRange.sheet.getName();
  let a1C1Gama      = obterA1C1(sheetName, columnLeft, firstRow, columnRight, lastRow)
  const range       = dRange.sheet.getRange(a1C1Gama);
  range.clear({validationsOnly: true});
  return range
}  

/** 
 * Removes validatons for the column where we will configure the new validations
 * @param {Object} dRange The range with data to be validated
 */
function clearDataRangeValidations (dRange) {
  const columnLeft  = numeroParaLetra(dRange.columnNumber);
  const columnRight = columnLeft
  const firstRow    = dRange.startRow
  const lastRow     = dRange.sheet.getLastRow(); 
  const sheetName   = dRange.sheet.getName();
  let a1C1Gama      = obterA1C1(sheetName, columnLeft, firstRow, columnRight, lastRow)
  const range       = dRange.sheet.getRange(a1C1Gama);
  range.clear({validationsOnly: true});
  return range
}  

/** 
 * Clears the lRange
 * @param {Object} lRange The local validation range
 */ 
function  clearRangeColumn(lRange) {
  let sheet = lRange.sheet;
  let numRows = sheet.getLastRow() - lRange.startRow + 1; // The number of row to clear
  let range = sheet.getRange(lRange.startRow, lRange.columnNumber, numRows);
  range.clear();
}

/** 
 * Copies the original data validation to the new data validation range
 * @param {Object} oRange The original validation range
 * @param {Object} lRange The local validation range
 */
function copyOriginalToLocalRange(oRange, lRange) {
  let oSpreadsheet           = oRange.spreadsheet;
  let rangeVals              = oSpreadsheet.getRangeByName(oRange.rangeName).getValues();
  let targetSheet            = lRange.sheet;
  let targetRangeFirstLine   = lRange.startRow;
  let targetRangeFirstColumn = lRange.columnNumber;
  copiarGama (rangeVals, targetSheet, targetRangeFirstLine, targetRangeFirstColumn)
}

/**
 * Update a range to fit data changes
 * @param {SpreadSheet} spreadSheet 
 * @param {Sheet} sheet 
 * @param {String} rangeA1, e.g. Teste!A2:A9
 * @param {String} rangeName, e.g. MetodoTeste
 */
function updateRange(spreadSheet, sheet, rangeA1, rangeName) {
  try {
    let sheetName = sheet.getName()
    
    // Get the range
    const range = sheet.getRange(rangeA1);

    // Check if a named range with this name already exists
    const existing = spreadSheet.getNamedRanges().find(nr => nr.getName() === rangeName);
    if (existing) {
      // Update the existing named range
      existing.setRange(range);
      Logger.log(`Updated named range "${rangeName}" to ${sheetName}!${rangeA1}`);
    } else {
      // Create a new named range
      spreadSheet.setNamedRange(rangeName, range);
      Logger.log(`Created named range "${rangeName}" for ${sheetName}!${rangeA1}`);
    }
  } catch (err) {
    Logger.log("Error: " + err.message);
  }
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
 * @param {Sheet} planilha - The sheet with the column to be validated
 * @param {Number} columnNumber - The number of the column to be validaded, 1-based
 * @param {String} validChoicesRangeName - O nome da gama com os valores validos
 * @returns {none} The system configures the validation
 */
function configureRangeValidation(sheet, columnNumber, validChoicesRangeName) {
  let columnLetter = numeroParaLetra(columnNumber);
  let lastRow      = sheet.getLastRow();
  let sheetName    = sheet.getName();
  let a1C1Gama     = obterA1C1(sheetName, columnLetter, 2, columnLetter, lastRow)

  let range        = sheet.getRange(a1C1Gama); // Specify the range for validation

  let rule         = SpreadsheetApp.newDataValidation()
  .requireValueInRange(sheet.getRange(validChoicesRangeName), true) // Reference range for valid values
  .setAllowInvalid(false) // Prevent invalid entries
  .build();

  range.setDataValidation(rule); // Apply the validation rule
}
