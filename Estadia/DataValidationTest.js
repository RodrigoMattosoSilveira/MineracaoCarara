const ReadDataValidationFileTest = () => {
	let validationCfg = ReadDataValidationFile("DataValidationHtmlTest.html")
	validationCfg !== null ? 
		console.info(" ✔︎ validationCfg !== null ") :
		console.error(" ✖︎  validationCfg !== null: " + validationCfg + " is null ");
	// accetableEntries
	validationCfg.hasOwnProperty("acceptableEntries")?
		console.info(" ✔︎ validationCfg.hasOwnProperty('acceptableEntries'") :
		console.error(" ✖︎ validationCfg.hasOwnProperty('acceptableEntries'");	
	let acceptableEntries = validationCfg.acceptableEntries;
	acceptableEntries !== null ? 
		console.info(" ✔︎ acceptableEntries !== null ") :
		console.error(" ✖︎  acceptableEntries !== null");
	// accetableEntries.Disponibilidade
		acceptableEntries.hasOwnProperty("Disponibilidade") ?
		console.info(" ✔︎ aacceptableEntries.hasOwnProperty('Disponibilidade')") :
		console.error(" ✖︎  acceptableEntries.hasOwnProperty('Disponibilidade')");
	let acceptableEntriesDisponibilidade = acceptableEntries.Disponibilidade
	acceptableEntriesDisponibilidade !== null ? 
		console.info(" ✔︎ acceptableEntriesDisponibilidade !== null ") :
		console.error(" ✖︎  acceptableEntriesDisponibilidade !== null");
	// accetableEntries.Disponibilidade.spreadsheetName
	acceptableEntriesDisponibilidade.hasOwnProperty("spreadsheetName") ?
		console.info(" ✔︎ acceptableEntriesDisponibilidade.hasOwnProperty('spreadsheetName')") :
		console.error(" ✖︎  acceptableEntriesDisponibilidade.hasOwnProperty('spreadsheetName')");
	let expectedValue = "Referencia";
	let actualValue = acceptableEntriesDisponibilidade.spreadsheetName;
	actualValue === expectedValue ?
		console.info(" ✔︎  acceptableEntriesDisponibilidade.spreadsheetName === " + actualValue) :
		console.error(" ✖︎ acceptableEntriesDisponibilidade.spreadsheetName !== " + expectedValue + ", " + actualValue);
	// accetableEntries.Disponibilidade.sheetName
	acceptableEntriesDisponibilidade.hasOwnProperty("sheetName") ?
		console.info(" ✔︎ acceptableEntriesDisponibilidade.hasOwnProperty('sheetName')") :
		console.error(" ✖︎  acceptableEntriesDisponibilidade.hasOwnProperty('sheetName')");
	expectedValue = "Disponibilidade";
	actualValue = acceptableEntriesDisponibilidade.sheetName;
	actualValue === expectedValue ?
		console.info(" ✔︎  acceptableEntriesDisponibilidade.sheetName === " + actualValue) :
		console.error(" ✖︎ acceptableEntriesDisponibilidade.sheetName !== " + expectedValue + ", " + actualValue);
	// accetableEntries.Disponibilidade.columnNumber
	acceptableEntriesDisponibilidade.hasOwnProperty("columnNumber") ?
		console.info(" ✔︎ acceptableEntriesDisponibilidade.hasOwnProperty('columnNumber')") :
		console.error(" ✖︎  acceptableEntriesDisponibilidade.hasOwnProperty('columnNumber')");
	expectedValue = 1;
	actualValue = acceptableEntriesDisponibilidade.columnNumber;
	actualValue === expectedValue ?
		console.info(" ✔︎  acceptableEntriesDisponibilidade.columnNumber === " + actualValue) :
		console.error(" ✖︎ acceptableEntriesDisponibilidade.columnNumber !== " + expectedValue + ", " + actualValue);
	// accetableEntries.Disponibilidade.rowNumber
	acceptableEntriesDisponibilidade.hasOwnProperty("rowNumber") ?
		console.info(" ✔︎ acceptableEntriesDisponibilidade.hasOwnProperty('rowNumber')") :
		console.error(" ✖︎  acceptableEntriesDisponibilidade.hasOwnProperty('rowNumber')");
	expectedValue = 2;
	actualValue = acceptableEntriesDisponibilidade.rowNumber;
	actualValue === expectedValue ?
		console.info(" ✔︎  acceptableEntriesDisponibilidade.rowNumber === " + actualValue) :
		console.error(" ✖︎ acceptableEntriesDisponibilidade.rowNumber !== " + expectedValue + ", " + actualValue);
	// accetableEntries.Metodo
	acceptableEntries.hasOwnProperty("Metodo") ?
		console.info(" ✔︎ acceptableEntries.hasOwnProperty('Metodo')") :
		console.error(" ✖︎  acceptableEntries.hasOwnProperty('Metodo')");
	let acceptableEntriesMetodo = acceptableEntries.Metodo
	acceptableEntriesMetodo !== null ? 
		console.info(" ✔︎ acceptableEntriesMetodo !== null ") :
		console.error(" ✖︎  acceptableEntriesMetodo !== null");
	// accetableEntries.Metodo.spreadsheetName
	acceptableEntriesMetodo.hasOwnProperty("spreadsheetName") ?
		console.info(" ✔︎ acceptableEntriesMetodo.hasOwnProperty('spreadsheetName')") :
		console.error(" ✖︎  acceptableEntriesMetodo.hasOwnProperty('spreadsheetName')");
	expectedValue = "Referencia";
	actualValue = acceptableEntriesMetodo.spreadsheetName;
	actualValue === expectedValue ?
		console.info(" ✔︎  acceptableEntriesMetodo.spreadsheetName === " + actualValue) :
		console.error(" ✖︎ acceptableEntriesMetodo.spreadsheetName !== " + expectedValue + ", " + actualValue);
	// accetableEntries.Disponibilidade.sheetName
	acceptableEntriesMetodo.hasOwnProperty("sheetName") ?
		console.info(" ✔︎ acceptableEntriesMetodo.hasOwnProperty('sheetName')") :
		console.error(" ✖︎  acceptableEntriesMetodo.hasOwnProperty('sheetName')");
	expectedValue = "Metodo";
	actualValue = acceptableEntriesMetodo.sheetName;
	actualValue === expectedValue ?
		console.info(" ✔︎  acceptableEntriesMetodo.sheetName === " + actualValue) :
		console.error(" ✖︎ acceptableEntriesMetodo.sheetName !== " + expectedValue + ", " + actualValue);
	// accetableEntries.Disponibilidade.columnNumber
	acceptableEntriesMetodo.hasOwnProperty("columnNumber") ?
		console.info(" ✔︎ acceptableEntriesMetodo.hasOwnProperty('columnNumber')") :
		console.error(" ✖︎  acceptableEntriesMetodo.hasOwnProperty('columnNumber')");
	expectedValue = 1;
	actualValue = acceptableEntriesMetodo.columnNumber;
	actualValue === expectedValue ?
		console.info(" ✔︎  acceptableEntriesMetodo.columnNumber === " + actualValue) :
		console.error(" ✖︎ acceptableEntriesMetodo.columnNumber !== " + expectedValue + ", " + actualValue);
	// accetableEntries.Disponibilidade.rowNumber
	acceptableEntriesMetodo.hasOwnProperty("rowNumber") ?
		console.info(" ✔︎ acceptableEntriesMetodo.hasOwnProperty('rowNumber')") :
		console.error(" ✖︎  acceptableEntriesMetodo.hasOwnProperty('rowNumber')");
	expectedValue = 2;
	actualValue = acceptableEntriesMetodo.rowNumber;
	actualValue === expectedValue ?
		console.info(" ✔︎  acceptableEntriesMetodo.rowNumber === " + actualValue) :
		console.error(" ✖︎ acceptableEntriesMetodo.rowNumber !== " + expectedValue + ", " + actualValue);
	// dataValidations
	validationCfg.hasOwnProperty("dataValidations") ?
		console.info(" ✔︎ validationCfg.hasOwnProperty('dataValidations'") :
		console.error(" ✖︎ validationCfg.hasOwnProperty('dataValidations'");	
	let dataValidations = validationCfg.dataValidations
	// dataValidations.Estadia
	dataValidations.hasOwnProperty('Estadia') ?
		console.info(" ✔︎ dataValidations.hasOwnProperty('Estadia')") :
		console.error(" ✖︎ datadataValidationsalidaton.hasOwnProperty('Estadia')");	
	let dataValidationsEstadia = dataValidations.Estadia
	// dataValidations.Estadia.DadosTeste
	dataValidationsEstadia.hasOwnProperty('DadosTeste') ?
		console.info(" ✔︎ dataValidationsEstadia.hasOwnProperty('DadosTeste')") :
		console.error(" ✖︎ dataValidationsEstadia.hasOwnProperty('DadosTeste')");	
	let dataValidationsEstadiaDados = dataValidations.Estadia.DadosTeste
	// dataValidations.Estadia.DadosTeste.Disponibilidade
	dataValidationsEstadiaDados.hasOwnProperty('Disponibilidade') ?
		console.info(" ✔︎ dataValidationsEstadiaDados.hasOwnProperty('Disponibilidade')") :
		console.error(" ✖︎ dataValidationsEstadiaDados.hasOwnProperty('Disponibilidade')");	
	// dataValidations.Estadia.DadosTeste.Disponibilidade.targetColumn
	let dataValidationsEstadiaDadosDisponibilidade = dataValidationsEstadiaDados.Disponibilidade
	dataValidationsEstadiaDadosDisponibilidade.hasOwnProperty('targetColumn') ?
		console.info(" ✔︎ dataValidationsEstadiaDadosDisponibilidade.hasOwnProperty('targetColumn') ") :
		console.error(" ✖︎ dataValidationsEstadiaDadosDisponibilidade.hasOwnProperty('targetColumn') ");	
	expectedValue = 3;
	actualValue = dataValidationsEstadiaDadosDisponibilidade.targetColumn;
	actualValue === expectedValue ?
		console.info(" ✔︎  dataValidationsEstadiaDadosDisponibilidade.targetColumn === " + actualValue) :
		console.error(" ✖︎ dataValidationsEstadiaDadosDisponibilidade.targetColumn !== " + expectedValue + ", " + actualValue);
	// dataValidations.Estadia.DadosTeste.Disponibilidade.targetRow
	dataValidationsEstadiaDadosDisponibilidade.hasOwnProperty('targetRow') ?
		console.info(" ✔︎ dataValidationsEstadiaDadosDisponibilidade.hasOwnProperty('targetRow')") :
		console.error(" ✖︎ dataValidationsEstadiaDadosDisponibilidade.hasOwnProperty('targetRow')");	
	expectedValue = 2;
	actualValue = dataValidationsEstadiaDadosDisponibilidade.targetRow;
	actualValue === expectedValue ?
		console.info(" ✔︎  dataValidationsEstadiaDadosDisponibilidade.targetRow === " + actualValue) :
		console.error(" ✖︎ dataValidationsEstadiaDadosDisponibilidade.targetRow !== " + expectedValue + ", " + actualValue);
	// dataValidations.Estadia.DadosTeste.Disponibilidade.acceptableEntriesName
	dataValidationsEstadiaDadosDisponibilidade.hasOwnProperty('acceptableEntriesName') ?
		console.info(" ✔︎ dataValidationsEstadiaDadosDisponibilidade.hasOwnProperty('acceptableEntriesName')") :
		console.error(" ✖︎ dataValidationsEstadiaDadosDisponibilidade.hasOwnProperty('acceptableEntriesName')");	
	expectedValue = "Disponibilidade";
	actualValue = dataValidationsEstadiaDadosDisponibilidade.acceptableEntriesName;
	actualValue === expectedValue ?
		console.info(" ✔︎  dataValidationsEstadiaDadosDisponibilidade.acceptableEntriesName === " + actualValue) :
		console.error(" ✖︎ dataValidationsEstadiaDadosDisponibilidade.acceptableEntriesName !== " + expectedValue + ", " + actualValue);
	// dataValidations.Estadia.DadosTeste.Metodo
	dataValidationsEstadiaDados.hasOwnProperty('Metodo') ?
		console.info(" ✔︎ dataValidationsEstadiaDados.hasOwnProperty('Metodo')") :
		console.error(" ✖︎ dataValidationsEstadiaDados.hasOwnProperty('Metodo')");	
	// dataValidations.Estadia.DadosTeste.Metodo.targetColumn
	let dataValidationsEstadiaDadosMetodo = dataValidationsEstadiaDados.Metodo
	dataValidationsEstadiaDadosMetodo.hasOwnProperty('targetColumn') ?
		console.info(" ✔︎ dataValidationsEstadiaDadosMetodo.hasOwnProperty('targetColumn') ") :
		console.error(" ✖︎ dataValidationsEstadiaDadosMetodo.hasOwnProperty('targetColumn') ");	
	expectedValue = 4;
	actualValue = dataValidationsEstadiaDadosMetodo.targetColumn;
	actualValue === expectedValue ?
		console.info(" ✔︎  dataValidationsEstadiaDadosMetodo.targetColumn === " + actualValue) :
		console.error(" ✖︎ dataValidationsEstadiaDadosMetodo.targetColumn !== " + expectedValue + ", " + actualValue);
	// dataValidations.Estadia.DadosTeste.Metodo.targetRow
	dataValidationsEstadiaDadosMetodo.hasOwnProperty('targetRow') ?
		console.info(" ✔︎ dataValidationsEstadiaDadosMetodo.hasOwnProperty('targetRow')") :
		console.error(" ✖︎ dataValidationsEstadiaDadosMetodo.hasOwnProperty('targetRow')");	
	expectedValue = 2;
	actualValue = dataValidationsEstadiaDadosMetodo.targetRow
	actualValue === expectedValue ?
		console.info(" ✔︎  dataValidationsEstadiaDadosMetodo.targetRow === " + actualValue) :
		console.error(" ✖︎ dataValidationsEstadiaDadosMetodo.targetRow !== " + expectedValue + ", " + actualValue);
	// dataValidations.Estadia.DadosTeste.Metodo.acceptableEntriesName
	dataValidationsEstadiaDadosMetodo.hasOwnProperty('acceptableEntriesName') ?
		console.info(" ✔︎ dataValidationsEstadiaDadosMetodo.hasOwnProperty('acceptableEntriesName')") :
		console.error(" ✖︎ dataValidationsEstadiaDadosMetodo.hasOwnProperty('acceptableEntriesName')");	
	expectedValue = "Metodo";
	actualValue = dataValidationsEstadiaDadosMetodo.acceptableEntriesName;
	actualValue === expectedValue ?
		console.info(" ✔︎  dataValidationsEstadiaDadosMetodo.acceptableEntriesName === " + actualValue) :
		console.error(" ✖︎ dataValidationsEstadiaDadosMetodo.acceptableEntriesName !== " + expectedValue + ", " + actualValue);
}