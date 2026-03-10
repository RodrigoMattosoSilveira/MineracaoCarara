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
				CararaLibrary.ConfigureDataValidationColumn(dConfig, oConfig, lConfig);
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

function ReadDataValidationFile (fileName) {
  const jsonString = HtmlService.createHtmlOutputFromFile(fileName).getContent();
  const jsonObject = JSON.parse(jsonString);
  return jsonObject
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

const SpreadsheetIdCache = {}
/**
 * A simple caching to prevent too many calls to CararaLibrary.GetSpreadsheetId
 * @param {Spreadsheet} activeSpreadsheet 
 * @param {string} spreasheetName 
 * @returns {String} spreasheetName's ID for the current environment
 */
function cararaLibraryGetSpreadsheetId (activeSpreadsheet, spreasheetName) {
	if (Object.hasOwn(SpreadsheetIdCache, spreasheetName)) {
		Logger.log("Returning cached spreadsheetID for: %s", spreasheetName);
		return SpreadsheetIdCache[spreasheetName];
	}
	Logger.log("Retrieving spreadsheetID for: %s", spreasheetName);
	SpreadsheetIdCache[spreasheetName] = CararaLibrary.GetSpreadsheetId(activeSpreadsheet, spreasheetName);
	return SpreadsheetIdCache[spreasheetName];
}