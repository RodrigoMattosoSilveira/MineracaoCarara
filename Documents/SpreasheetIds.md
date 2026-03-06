## For each spreadsheet used in a script
```javascript
// Retrieve its spreadsheetId
activeSpreadsheet = spreadsheetApp.getActiveSpreadsheet();
spreadsheetId = CararaLibrary.GetSpreadsheetId(spreadSheetName, "Estadia");
spreadsheetId = CararaLibrary.GetSpreadsheetId(spreadSheetName, "Pessos");
```
## The CararaLibrary.GetSpreadsheetId takes care of the rest
```javascript
function GetSpreadsheetId(activeSpreadsheet, spreadSheetName) {
	env = getEnvironment(activeSpreadsheet)
	if (env === null) throw new Error("Não foi possível recuperar o ambiente " + env + ".");
	id  = getSpreadSheetPropId(env, spreadSheetName);
	return id
}
```
## Get the environment
We have three, each hosted in a separare Google Drive folder: `DEV`, `TEST`, `PROD`. The spreadsheets in one folder have different spreadsheetIds that their siblings in another folder; we place a configuratio file, `config.txt`, in each of the folders, with `key: value` pairs including information about their environment.

The get environment logic uses the `Google Apps` machinery to read the file, parses into a `configuration object`, and ensures that it contains the `ENV` key, read  and returns its value
```javascript
function getEnvironment(activeSpreadsheet) {
	folderId = getParentFolderId(activeSpreadsheet);
	if (folderId == null) throw new Error("Não foi possível recuperar o folderId.");
	config = readConfigFile(folderId)
	if (config == null) throw new Error("Não foi possível recuperar a configuracao.");	
	env = config["ENV"]
	if (ENV_NAMES.indexOf(env) === -1) throw new Error("Nome do ambiente invalido: " + env + ".");	
	return env;
}
```
## Get the spreadshetId
We store the spreadsheetIds in as CararaLibrary script properties as follows:
```text
Property
<<ENV>>_<<SPREADSHEET NAME>>_ID

Value
The hard coded value of the spreadsheetId for the spreasheet, in the environment. Thus we have 3 for each spreadsheet, one in each environment.
```

We retrive a spreasheet property as follows:
```javascript
function getSpreadSheetPropId(env, name) {
	if (ENV_NAMES.indexOf(env)) {
		throw new Error("Invalido nome de ambiente: " + env + ".");
	}

	if (SPREADSHEET_NAMES.indexOf(name) === -1) {
		throw new Error("Invalido nome de planilha: " + name + ".");
	}

	const props = PropertiesService.getScriptProperties();
	const propName = env + "_"  + name + "_ID"
	const id  = props.getProperty(propName);

  	if (!id) {
		throw new Error("A Biblioteca Carara não possui a propriedade " + propName + ".");
  	}
	return id;
}
```
## Implementation Notes
This [link](https://stackoverflow.com/questions/62175748/driveapp-error-were-sorry-a-server-error-occurred-please-wait-a-bit-and-try) was instrumental in solving the `"We're sorry, a server error occurred. Please wait a bit and try again." ` error.

## Replacing hard coded spreadsheetIds in Google Sheets
They are use in `IMPORTRANGE(spreadsheet, range)`, which are executed when the actor opens the speadsheet. Thus, I'll have to hook up the logic to replace the `IMPORTRANGE(spreadsheet, range)` statements on the spreadsheet's `onOpen` event. The use cases are:
1. To inform a `data validation` range of the acceptable values. In this case, I'll read the reference data and add it to the `data validation` without the intermediary step of storing it in a working sheet;
2. ?