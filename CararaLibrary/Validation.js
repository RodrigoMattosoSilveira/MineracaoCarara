function ConfigureDataValidations(configurationObj, environment) {
	// Process each data validation
	try {
		// acceptableEntries
		const configurationObjKeys = Object.keys(configurationObj);
		if (configurationObjKeys.length !== 2) {
			throw new Error("Data Validation file has more than 2 entries");
		}
		if (configurationObjKeys.indexOf("acceptableEntries") === -1) {
			throw new Error("Data Validation file does not include the the acceptable entries configurations");
		}  
		if (configurationObjKeys.indexOf(environment.spreadsheetName) === -1) {
			throw new Error("Data Validation file does not include the spreadsheet validations");
		}
		const acceptableEntriesCfg = configurationObj.acceptableEntries; 
		let validationsKeys = Object.keys(acceptableEntriesCfg);
		validationsKeys.forEach(validationsKey => {
			const validationKeys = Object.keys(acceptableEntriesCfg[validationsKey]);
			if (validationKeys.length !== 4) {
				throw new Error("Acceptable entries does not contain 3 entries");
			}
			if (validationKeys.indexOf("spreadsheetName") === -1) {
				throw new Error("Acceptable entries missing sheetName key");
			}
			if (validationKeys.indexOf("sheetName") === -1) {
				throw new Error("Acceptable entries missing sheetName key");
			}
			if (validationKeys.indexOf("columnNumber") === -1) {
				throw new Error("Acceptable entries missing columnNumber key");
			}
			if (validationKeys.indexOf("rowNumber") === -1) {
				throw new Error("SAcceptable entries missing rowNumber key");
			}
		})

		// spreadsheetName
		const spreasheetCfg = configurationObj[environment.spreadsheetName];  
		const spreasheetCfgKeys = Object.keys(spreasheetCfg);
		if (spreasheetCfgKeys.length !== 2) {
			throw new Error("Spreadsheet configuraton has more than 2 entries");
		}
		if (spreasheetCfgKeys.indexOf("acceptableEntries") === -1) {
			throw new Error("Spreadsheet configuraton does not include the the local acceptable entries configurations");
		}  
		// spreadsheetName.acceptableEntries
		const localAcceptableEntriesCfg = spreasheetCfg.acceptableEntries;
		validationsKeys = Object.keys(localAcceptableEntriesCfg);
		validationsKeys.forEach(validationsKey => {
			const validationKeys = Object.keys(localAcceptableEntriesCfg[validationsKey]);
			if (validationKeys.length !== 3) {
				throw new Error("Local acceptable entries does not contain 3 entries");
			}
			if (validationKeys.indexOf("sheetName") === -1) {
				throw new Error("Local acceptable entries missing sheetName key");
			}
			if (validationKeys.indexOf("columnNumber") === -1) {
				throw new Error("Local acceptable entries missing columnNumber key");
			}
			if (validationKeys.indexOf("rowNumber") === -1) {
				throw new Error("Local acceptable entries missing rowNumber key");
			}
		})
		// spreadsheetName.dataValidation
		if (spreasheetCfgKeys.indexOf("dataValidations") === -1) {
			throw new Error("Spreadsheet configuraton does not include the the dataValidation section");
		}  
		const dataValidationsCfg = spreasheetCfg.dataValidations;
		// spreadsheetName.dataValidation.sheets
		const sheetsKeys = Object.keys(dataValidationsCfg);
		sheetsKeys.forEach(sheetName => {
			// spreadsheetName.dataValidation.sheet
			environment.dSheetName = sheetName;
			const columnKeys = Object.keys(dataValidationsCfg[sheetName]);
			columnKeys.forEach(columnKey => {
				const columnKeyParms = Object.keys(dataValidationsCfg[sheetName][columnKey]);
				if (columnKeyParms.length !== 2) {
					throw new Error("Sheet validation does not contain 2 entries");
				}
				if (columnKeyParms.indexOf("columnNumber") === -1) {
					throw new Error("Sheeet validation missing columnNumber key");
				}
				if (columnKeyParms.indexOf("rowNumber") === -1) {
					throw new Error("Sheeet validation missing rowNumber key");
				}
				const validationCfg = dataValidationsCfg[sheetName][columnKey]
				environment.validationName = columnKey;
				// Build oConfig
				let oConfig = buildOriginalAcceptableEntriesCFG(configurationObj, environment);
				// build lConfig
				let lConfig = buildLocalAcceptableEntriesCFG(configurationObj, environment);
				// build dConfig
				let dConfig = buildDataValidationCFG(configurationObj, environment);
				// Configure data validations
				ConfigureDataValidationColumn(dConfig, oConfig, lConfig);
			})
		})
	} catch (err) {
    	Logger.log("Error: " + err);
    	return false;
	}
}

/**
 * 
 * @param {Object} configurationObj 
 * @param {Object} environment 
 * @returns 
 */
function buildOriginalAcceptableEntriesCFG(configurationObj, environment) {
	const activeSpreadsheet   = environment.activeSpreadsheet;
	const validationName	  = environment.validationName;
	const acceptableEntryCFG  = configurationObj.acceptableEntries[validationName]
	let spreadsheetName       = acceptableEntryCFG.spreadsheetName;
	let spreadsheetId         = cararaLibraryGetSpreadsheetId(activeSpreadsheet, toUpperCaseSafe(spreadsheetName))
	let spreadsheet           = SpreadsheetApp.openById(spreadsheetId)
	let sheetName             = acceptableEntryCFG.sheetName;
	let sheet                 = spreadsheet.getSheetByName(sheetName);
	let acceptableEntriesConfig = {
		spreadsheetId: spreadsheetId,
		spreadsheet: spreadsheet,
		spreadsheetName: spreadsheet.getName(),
		sheet: sheet,
		sheetName: sheet.getName(),
		// 1-based
		// all original reference data is hostedin column 1
		columnNumber: acceptableEntryCFG.columnNumber, 
		// 1-based
		startRow: acceptableEntryCFG.rowNumber
	};
	return acceptableEntriesConfig;
}
function buildLocalAcceptableEntriesCFG(configurationObj, environment) {
	const validationName	       = environment.validationName;
	const spreadsheetName          = environment.spreadsheetName;
	const activeSpreadsheet        = environment.activeSpreadsheet;
	const localAcceptableEntryCFG  = configurationObj[spreadsheetName]["acceptableEntries"][validationName];
	const sheetName                = localAcceptableEntryCFG.sheetName;
	const spreadsheetId            = cararaLibraryGetSpreadsheetId(activeSpreadsheet, toUpperCaseSafe(spreadsheetName));
	const spreadsheet              = SpreadsheetApp.openById(spreadsheetId);
	const sheet                    = spreadsheet.getSheetByName(sheetName);
	let acceptableEntriesConfig = {
		spreadsheetId: spreadsheetId,
		spreadsheet: spreadsheet,
		spreadsheetName: spreadsheet.getName(),
		sheet: sheet,
		sheetName: sheet.getName(),
		// 1-based
		// all original reference data is hostedin column 1
		columnNumber: localAcceptableEntryCFG.columnNumber, 
		// 1-based
		startRow: localAcceptableEntryCFG.rowNumber
	};
	return acceptableEntriesConfig;
}
function buildDataValidationCFG(configurationObj, environment) {
	const validationName	       = environment.validationName;
	const spreadsheetName          = environment.spreadsheetName;
	const activeSpreadsheet        = environment.activeSpreadsheet;
	const sheetName                = environment.dSheetName;
	const validationCFG            = configurationObj[spreadsheetName]["dataValidations"][sheetName][validationName];
	const spreadsheetId            = cararaLibraryGetSpreadsheetId(activeSpreadsheet, toUpperCaseSafe(spreadsheetName));
	const spreadsheet              = SpreadsheetApp.openById(spreadsheetId);
	const sheet                    = spreadsheet.getSheetByName(sheetName);	
	const dataValidationConfig = {
		spreadsheetId: spreadsheetId,
		spreadsheetName: spreadsheet.getName(),
		sheet: sheet,
		sheetName: sheet.getName(),
		startRow: validationCFG.rowNumber, 
		columnNumber: validationCFG.columnNumber
	}
	return dataValidationConfig;
}


/**
 * Converts a given string to uppercase.
 * @param {string} str - The input string.
 * @returns {string} - The uppercase version of the string.
 */
function toUpperCaseSafe(str) {
    // Validate input type
    if (typeof str !== 'string') {
        throw new TypeError('Input must be a string.');
    }
    return str.toUpperCase();
}

const spreadsheetIdCache = {}
/**
 * A simple caching to prevent too many calls to GetSpreadsheetId
 * @param {Spreadsheet} activeSpreadsheet 
 * @param {string} spreasheetName 
 * @returns {String} spreasheetName's ID for the current environment
 */
function cararaLibraryGetSpreadsheetId (activeSpreadsheet, spreasheetName) {
	if (Object.hasOwn(spreadsheetIdCache, spreasheetName)) {
		Logger.log("Returning cached spreadsheetID for: %s", spreasheetName);
		return spreadsheetIdCache[spreasheetName];
	}
	Logger.log("Retrieving spreadsheetID for: %s", spreasheetName);
	spreadsheetIdCache[spreasheetName] = GetSpreadsheetId(activeSpreadsheet, spreasheetName);
	return spreadsheetIdCache[spreasheetName];
}
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
