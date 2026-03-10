# Introduction

Data validation is a feature in Google Sheets that sets rules for `acceptable data entries` in a cell or range. It helps prevent errors, maintain data integrity, and streamline data entry by restricting inputs to specific types such as numbers, text, dates, or predefined lists. Invalid entries can trigger a warning or be rejected entirely, depending on your settings.

The Google Sheet validation engine requires the acceptable data entries to be in the same `local spreadsheet` as the range being validaded; since our  acceptable data entries reside on their own `original spreadsheets`, we must copy the acceptable data entries to a work sheet in the `local spreadsheet`. I'll use the worksheet `Trabalho` in the local spreadsheets to host the acceptable entries in the `local spreadsheet`.

## Single column data validation
This entails to:
- Clean up existing validations for the column being validated, since the new acceptable data entries might differ;
- Clean up the acceptable data entries in the local spreadsheet, again, since the new acceptable data entries might differ;
- Copy the new acceptable data entries from their original spreadsheet to the local spreadsheet;
- Set up the new acceptable data entries in the local spreadsheet's sheet / column;

Therefore, there are three object involved in configuring validation:
- The local spreadsheet, sheet, column - For example, the Metods column in the Estadia.Dados sheet;
- The original acceptable data entries - For example,  column A in the Referencia.Metodos sheet; 

Note that for testing purposes I'll use the Referencia.MetodosTest, Estadia.DadosTest, and Estadia.TrabalhoTest sheets.

I'll use three objects to hold the information about these ranges:

```javascript
// oRange
// Notice that I'll have to refactor this logic to provide the arguments used
// by the function
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
```

```javascript
// lRange
// Notice that I'll have to refactor this logic to provide the arguments used
// by the function
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
```
```javascript
// dRange
// Notice that I'll have to refactor this logic to provide the arguments used
// by the function
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
```

## Multiple sheets and column data validations
I'll write one `JSON` configuration file per local spresheet with data validations; this file will describe the each and all data confirations for each and all local spresheet's sheets. I'll process this configuration file on the `onOpen` event. 

### The following configuration file:
This [JSON schema valildator](https://www.jsongenerator.io/schema) is very helpfull:
```json
{
	"acceptableEntries": {
		"Disponibilidade": {
			"spreadsheetName": "Referencia",
			"sheetName": "Disponibilidade",
			"columnNumber": 1,
			"rowNumber": 2		
		},
		"Metodo": {
			"spreadsheetName": "Referencia",
			"sheetName": "Metodo",
			"columnNumber": 1,
			"rowNumber": 2
		}
	},	
	"Estadia": {
		"acceptableEntries": {
			"Disponibilidade": {
				"sheetName": "TrabalhoTeste",
				"columnNumber": 2,
				"rowNumber": 2		
			},
			"Metodo": {
				"sheetName": "TrabalhoTeste",
				"columnNumber": 3,
				"rowNumber": 2
			}		
		},
		"dataValidations": {
			"DadosTeste": {
				"Disponibilidade": {
					"targetColumn": 3,
					"targetRow": 2,		
					"acceptableEntriesName": "Disponibilidade"
				},
				"Metodo": {
					"targetColumn": 4,
					"targetRow": 2,		
					"acceptableEntriesName": "Metodo"
				}
			}			
		}

	}	
}
```
Notes:
- `acceptableEntries`:
  - Configurations describing each of the data entries used for validation in the spreadsheet;
  - There is one configuration per data set entry; see the `Disponibilidade` and `Metdo` keys; 
- `Estadia`
  - The name of the spreadsheet whose sheets are the target of the data validation;
  - There must one and only one spreadsheet name in this configuration file;
  - `acceptableEntries`
    - This section must mirror the `acceptableEntries` entries;
  - `dataValidations`:
    - This session consists of one entry per sheet, with validations for one or more of its columns;
    - `DadosTest`
      - A section describing the configurations for one or more columns in the _DadosTest_ sheet;
      - `Disponibilidade`
        - A section describing the name of an acceptable data entry and the column/row where it starts

### Parsing the JSON file
I did this:
- Add an HTML file each of the local spreadsheets with data validation;
- Remove all the content of the HTML file and insert the local spreadsheets' JSON configuration files;
- Include a local spreadsheet script function that reads and parses configuration file:
  
```javascript
// Assuming the data validation configuration file I used in the local spreadsheets is `DataValidation.html':
const jsonString = HtmlService.createHtmlOutputFromFile("DataValidation.html").getContent();
const jsonObject = JSON.parse(jsonString);
```

### Processing the JSON file
Our Data Validation Configuration files are spreasheet-centric and have two parts:
- `acceptableEntries` - The source for all the accetable entries;
- `Estadia` - The spreadsheet name for which we are describing data configurations;

The _Estadia_ section has two parts:
- `acceptableEntries` - The local source for all the accetable entries;
- `dataValidations` - The target sheets and their columns
- Note that each dataValidation includes a key, `acceptableEntriesName`, describing the local acceptable entries to be used for its configuraton;

Then we will process the data Validations. For each entry we will:
1. Build the Original Acceptable Entries configuration object, which is the data Validation's acceptableEntriesConfiguratio object, `oConfig`;
2. Build the Local Acceptable Entries configuration object, `lConfig`;
3. Build the Data Validation Configuration, where data validation is applied to, `dConfig`;
4. Call the well tested `ConfigureDataValidationColumn(dConfig, oConfig, lConfig)`;