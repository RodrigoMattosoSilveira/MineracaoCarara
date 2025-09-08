/**
 * Removes duplicate rows from the current sheet.
 */
function removeDuplicates() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const data = sheet.getDataRange().getValues();
  const uniqueData = {};
  for (let row of data) {
    const key = row.join();
    uniqueData[key] = uniqueData[key] || row;
  }
  sheet.clearContents();
  const newData = Object.values(uniqueData);
  sheet.getRange(1, 1, newData.length, newData[0].length).setValues(newData);
}

/* ********************************************************************************************************************* */
// activateSheet
//    Activates a sheet in the current spreadsheet
// 
// Input:
//    sheetName (String) - The sheet name to activate
// 
// Output:
//    sheet (Sheet) - The activated sheet, or null if not found
//
//* ********************************************************************************************************************* */
// 
function activateSheet(sheetName) {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getSheetByName(sheetName);
  if (sheet) {
    spreadsheet.setActiveSheet(sheet);
  } else {
    return null;
  }
  return sheet;
}

/* ********************************************************************************************************************* */
// removeHeaderAndBlankRiows
//    Remove header and blank rows from the named range. For each row, it examines row[0] ang filters it out if it is
//    equal to "" or the name argument
// 
// Input:
//    rangeName (String) - The range name where to apply the filter
//    headerString - (String) - The undesired header string on the named column
//    column (Int) - The column where to apply the filter
//
// Output:
//    range (Range) - The filtered range, null if no range found
//* ********************************************************************************************************************* */
// 
function removeHeaderAndBlankRows(rangeName, header, column) {
  // const spreadSheet = SpreadsheetApp.getActiveSpreadsheet();
  // const sheet = spreadSheet.getSheetByName(sheetName);
  // const range = sheet.getRange("A1:D100");
  // const filter = range.createFilter();
  // Get the Range
  const spreadSheet = SpreadsheetApp.getActiveSpreadsheet();
  var range = spreadSheet.getRangeByName(rangeName);
  if (!range) {
    return null;
  }

  var filter;
  // Create a filter in the Range
  if (range.getFilter()) {
    filter = range.getFilter();
    filter.remove();
  }
  filter = range.createFilter();
 
  // Set criteria, no hader string nor blanks
  const criteria = SpreadsheetApp.newFilterCriteria().whenTextDoesNotContain(header).build();

  // Apply the criteria to the filter
  filter.setColumnFilterCriteria(column, criteria);

  // Retrive the filtered data
  range = filter.getRange();
  var filteredData = range.getValues();

  // Remove the filter 
  // filter.remove();

  return filteredData;
}
// ****************************************************************************
// Converter um dado lido de uma planilha na célula em uma cadeia the caracters
// 
// @parm {string} data - Uma cadeia the caracters representando uma data
// @return {Date|null} - A data convertida; false otherwise
// ****************************************************************************
//
function dateToString(data) {
	let dataObj = new Date(data);
	let dataStr = '';

	// Month
	if ((dataObj.getMonth() + 1) < 10) {
		dataStr += "0";
	}
	dataStr += dataObj.getMonth() + 1;
	dataStr += '/';
	// Day
	if (dataObj.getDate() < 10) {
		dataStr += "0";
	}
	dataStr += dataObj.getDate();
	dataStr += '/';
	// Year
	dataStr += dataObj.getFullYear();

	return dataStr;
}

// ****************************************************************************
// Converter um numero para a letra maiuscula equivalente
// 
// @parm {number} num - A numero a ser convertido
// @return {string|null} - a letra
// ****************************************************************************
//
function numeroParaLetra (num) { return (num < 1 || num > 26) ? null : String.fromCharCode(num + 64); }


if (typeof module !== 'undefined') module.exports = {
    dateToString,
    numeroParaLetra,
}