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
      "acceptableEntriesName": {
        "spreadsheetName": "spreadsheetName",
        "sheetName": "sheetName",
        "columnNumber": 1,
        "rowNumber": 2
    }
  },
  "dataValidation": {
    "spreadsheetName": {
      "columnName": {
        "targetColumn": 1,
        "targetRow": 1,
        "acceptableEntriesName": "acceptableEntriesName"
      }
    }
  }
}
```
Notes:
- `acceptableEntries`:
  - The `acceptableEntriesName` object name is unique to its function, as for instance Metodo; it can be used for multiple sheets in the same local spreadsheet;
  - I'll derive the orinal spreadsheet ID, and its data using the existing machinery in place;
  - The `sheetName` r
- `dataValidation`:
  - `spreadsheetName` the local spreadsheet name;
    - `sheetName` unique sheeet name identifying the sheets with data validation;
      - `columnName` unique column name for the sheetName, identifying the columnswith data validation;
        - `acceptableEntriesName` the name of the data validation object described in acceptableEntries;

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
Our Data Validation Configuration files are spreasheet-centric and have two halves, i. the configuration of the acceptable entries, hosted in their own spreadsheets, used by all the spreasheet's sheets, ii. the data validation configurations, consisting of the spreadshet's sheets, their columns, staring rows, and acceptable entries.

We will build an object with all the acceptable entries configuratons:
```javascript
acceptableEntries = {
  "EntryName": {
    ...acceptableEntriesConfiguraton
  }
  ...
}
```
We will build an object with all the data Validations:
```javascript
 data Validations = {
  "dataValidation": {
    ...dataValidationConfiguraton
  }
 }
```
 Note that one of the keys in the dataValidationConfiguraton is its acceptableEntriesConfiguraton.

Then we will process the data Validations. For each entry we will:
1. Build the Original Acceptable Entries configuration object, which is the data Validation's acceptableEntriesConfiguratio object, `oConfig`;
2. Build the Local Acceptable Entries configuration object, `lConfig`;
3. Build the Data Validation Configuration, where data validation is applied to, `dConfig`;
4. Call the well tested `ConfigureDataValidationColumn(dConfig, oConfig, lConfig)`;