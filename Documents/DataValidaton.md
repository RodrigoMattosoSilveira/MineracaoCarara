The Google Sheet validation engine requires the validation range to be in the same sheet as the range for which to be validaded; since our validation ranges reside on their own spreadsheet, we must copy them to the same sheet as the range to be validaded. This entails to:
- Clean up existing validations for the column at hand, since the new validaton data might differ;
- Clean up the validation range, again, since the new validaton data might differ;
- Copy the validations in Referencia to the target Google Sheet
- Set up the new validations in the target Google Sheet

Therefore, there are three object involved in configuring validation:
- The range with data to be validated - In our case a column in a sheet, such as methods of payment in the Estadia.Dados sheet;
- The original validation range - In our case column A in a sheet, such as Metodos, in the Referencia.Metodos sheet; 
- The local validation range - In our case column in a sheet, Trabalho, in the same spreadsheet as the data being validaded.

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