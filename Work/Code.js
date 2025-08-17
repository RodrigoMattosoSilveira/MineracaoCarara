/* ********************************************************************************************************************* */
// setEstadiaFormatCondition
// 		Creates a filter that removes rows with blank our header cells on column 1
// 
// Input:
// 		sheetName (String) - The sheet name where to apply the criteria
// 		rangeName (String) - The range name where to apply the criteria
// 		column (Int) - The column where to apply the criteria
//
// Output:
// 		TRUE if succefull, null otherwise
//
//* ********************************************************************************************************************* */
// 
function ccSetEstadiaFormatCondition (sheetName, column) {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getSheetByName(sheetName);
  if (!sheet) {
    return null;
  } else {
    spreadsheet.setActiveSheet(sheet);
  }

  var r1c1 = "R1C" + column + ":R1000C" + column; 
  const range = sheet.getRange(r1c1);
  if (!range) {
    return null;
  }
  Logger.log(JSON.stringify(range.getValues()))
;
  let todayExpired = new Date();
  todayExpired.setDate(todayExpired.getDate() - 90);
  let todayWeek = new Date();
  todayWeek.setDate(todayWeek.getDate() - 83);
  let todayMonth = new Date();
  todayMonth.setDate(todayMonth.getDate() - 60);

  // Get the existing sheet's formating rules
  const rules = sheet.getConditionalFormatRules(); 

  // Expired Estadias; Cell is before Today() - 90
  var rule = SpreadsheetApp.newConditionalFormatRule()
    .whenDateBefore(todayExpired)
    .setBackground('#FF0000')
    .setRanges([range])
    .build();
  rules.push(rule)

  // Estadias about to expire; Cell is before Today() - 83
  rule = SpreadsheetApp.newConditionalFormatRule()
    .whenDateBefore(todayWeek)
    .setBackground('#ffff00')
    .setRanges([range])
    .build();
  rules.push(rule)

  // Estadias one month away from expiring; Cell is before Today() - 60
  rule = SpreadsheetApp.newConditionalFormatRule()
    .whenDateBefore(todayMonth)
    .setBackground('#00ff00')
    .setRanges([range])
    .build();
  rules.push(rule)
  sheet.setConditionalFormatRules(rules); // Apply the updated rules
}

/* ********************************************************************************************************************* */
// removeHeaderAndBlankRiows
// 		Remove header and blank rows from the named range
// 
// Input:
// 		rangeName (String) - The range name where to apply the filter
//		headerString - (String) - The undesired header string on the named column
// 		column (Int) - The column where to apply the filter
//
// Output:
// 		range (Range) - The filtered range, null if no range found
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

/* ********************************************************************************************************************* */
// activateSheet
// 		Activates a sheet in the current spreadsheet
// 
// Input:
//		sheetName (String) - The sheet name to activate
// 
// Output:
// 		sheet (Sheet) - The activated sheet, or null if not found
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
